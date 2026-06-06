import { NotifikasiRepository } from '../../data/repositories/NotifikasiRepository.js';
import { SendNotifikasi } from '../../domain/usecases/notifikasi/SendNotifikasi.js';
import { MarkAsRead } from '../../domain/usecases/notifikasi/MarkAsRead.js';
import { MarkAllAsRead } from '../../domain/usecases/notifikasi/MarkAllAsRead.js';

const notifikasiRepository = new NotifikasiRepository();
const sendNotifikasi = new SendNotifikasi(notifikasiRepository);
const markAsRead = new MarkAsRead(notifikasiRepository);
const markAllAsRead = new MarkAllAsRead(notifikasiRepository);

export const index = async (req, res, next) => {
  try {
    const result = await notifikasiRepository.findByUser(req.user.id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const markRead = async (req, res, next) => {
  try {
    const result = await markAsRead.execute(parseInt(req.params.id));
    res.json({ success: true, message: 'Notifikasi dibaca', data: result });
  } catch (err) { next(err); }
};

export const markAllRead = async (req, res, next) => {
  try {
    await markAllAsRead.execute(req.user.id);
    res.json({ success: true, message: 'Semua notifikasi dibaca' });
  } catch (err) { next(err); }
};

export const send = async (req, res, next) => {
  try {
    const result = await sendNotifikasi.execute(req.body);
    res.json({ success: true, message: 'Notifikasi dikirim', data: result });
  } catch (err) { next(err); }
};
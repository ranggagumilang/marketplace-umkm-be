import { TransaksiRepository } from '../../data/repositories/TransaksiRepository.js';
import { DetailTransaksiRepository } from '../../data/repositories/DetailTransaksiRepository.js';
import { CreateTransaksi } from '../../domain/usecases/transaksi/CreateTransaksi.js';
import { GetTransaksiByUser } from '../../domain/usecases/transaksi/GetTransaksiByUser.js';
import { GetAllTransaksi } from '../../domain/usecases/transaksi/GetAllTransaksi.js';
import { UpdateStatusTransaksi } from '../../domain/usecases/transaksi/UpdateStatusTransaksi.js';

const transaksiRepository = new TransaksiRepository();
const detailTransaksiRepository = new DetailTransaksiRepository();
const createTransaksi = new CreateTransaksi(transaksiRepository);
const getTransaksiByUser = new GetTransaksiByUser(transaksiRepository);
const getAllTransaksi = new GetAllTransaksi(transaksiRepository);
const updateStatusTransaksi = new UpdateStatusTransaksi(transaksiRepository);

export const store = async (req, res, next) => {
  try {
    const data = { ...req.body, id_user: req.user.id };
    if (data.detail_transaksi) {
      data.detail_transaksi = { create: data.detail_transaksi };
    }
    const result = await createTransaksi.execute(data);
    res.json({ success: true, message: 'Transaksi berhasil dibuat', data: result });
  } catch (err) { next(err); }
};

export const index = async (req, res, next) => {
  try {
    const result = await getTransaksiByUser.execute(req.user.id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const all = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    if (page) {
      const result = await getAllTransaksi.execute({ page: +page, limit: limit ? +limit : 10 });
      res.json({ success: true, ...result });
    } else {
      const result = await getAllTransaksi.execute();
      res.json({ success: true, data: result.data || result });
    }
  } catch (err) { next(err); }
};

export const show = async (req, res, next) => {
  try {
    const result = await transaksiRepository.findById(parseInt(req.params.id));
    if (!result) throw { statusCode: 404, message: 'Transaksi tidak ditemukan' };
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const updateStatus = async (req, res, next) => {
  try {
    const result = await updateStatusTransaksi.execute(parseInt(req.params.id), req.body.status);
    res.json({ success: true, message: 'Status transaksi diupdate', data: result });
  } catch (err) { next(err); }
};

export const detail = async (req, res, next) => {
  try {
    const result = await detailTransaksiRepository.findByTransaksi(parseInt(req.params.id));
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};
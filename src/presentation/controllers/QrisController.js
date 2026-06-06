import { QrisConfigRepository } from '../../data/repositories/QrisConfigRepository.js';
import { GetQrisConfig } from '../../domain/usecases/qris/GetQrisConfig.js';
import { UpdateQrisConfig } from '../../domain/usecases/qris/UpdateQrisConfig.js';

const qrisRepository = new QrisConfigRepository();
const getQrisConfig = new GetQrisConfig(qrisRepository);
const updateQrisConfig = new UpdateQrisConfig(qrisRepository);

export const show = async (req, res, next) => {
  try {
    const result = await getQrisConfig.execute();
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const upsert = async (req, res, next) => {
  try {
    if (!req.file) throw { statusCode: 400, message: 'Gambar QR wajib diupload' };
    const data = {
      gambar_url: req.file.path,
      cloudinary_public_id: req.file.filename,
      id_admin: req.user.id
    };
    const result = await updateQrisConfig.execute(data);
    res.json({ success: true, message: 'QRIS diperbarui', data: result });
  } catch (err) { next(err); }
};
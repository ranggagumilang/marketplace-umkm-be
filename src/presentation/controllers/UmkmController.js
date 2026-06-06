import { UmkmRepository } from '../../data/repositories/UmkmRepository.js';
import { GetAllUmkm } from '../../domain/usecases/umkm/GetAllUmkm.js';
import { GetUmkmById } from '../../domain/usecases/umkm/GetUmkmById.js';
import { CreateUmkm } from '../../domain/usecases/umkm/CreateUmkm.js';
import { UpdateUmkm } from '../../domain/usecases/umkm/UpdateUmkm.js';
import { DeleteUmkm } from '../../domain/usecases/umkm/DeleteUmkm.js';

const umkmRepository = new UmkmRepository();
const getAllUmkm = new GetAllUmkm(umkmRepository);
const getUmkmById = new GetUmkmById(umkmRepository);
const createUmkm = new CreateUmkm(umkmRepository);
const updateUmkm = new UpdateUmkm(umkmRepository);
const deleteUmkm = new DeleteUmkm(umkmRepository);

export const index = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await getAllUmkm.execute({ page: page ? +page : undefined, limit: limit ? +limit : undefined });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const show = async (req, res, next) => {
  try {
    const result = await getUmkmById.execute(parseInt(req.params.id));
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const store = async (req, res, next) => {
  try {
    const data = { ...req.body, id_admin: req.user.id };
    if (req.file) data.logo = req.file.path;
    const result = await createUmkm.execute(data);
    res.json({ success: true, message: 'UMKM ditambahkan', data: result });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) data.logo = req.file.path;
    const result = await updateUmkm.execute(parseInt(req.params.id), data);
    res.json({ success: true, message: 'UMKM diupdate', data: result });
  } catch (err) { next(err); }
};

export const destroy = async (req, res, next) => {
  try {
    await deleteUmkm.execute(parseInt(req.params.id));
    res.json({ success: true, message: 'UMKM dihapus' });
  } catch (err) { next(err); }
};

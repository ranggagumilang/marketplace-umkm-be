import { ProdukRepository } from '../../data/repositories/ProdukRepository.js';
import { GetAllProduk } from '../../domain/usecases/produk/GetAllProduk.js';
import { GetProdukById } from '../../domain/usecases/produk/GetProdukById.js';
import { CreateProduk } from '../../domain/usecases/produk/CreateProduk.js';
import { UpdateProduk } from '../../domain/usecases/produk/UpdateProduk.js';
import { DeleteProduk } from '../../domain/usecases/produk/DeleteProduk.js';

const produkRepository = new ProdukRepository();
const getAllProduk = new GetAllProduk(produkRepository);
const getProdukById = new GetProdukById(produkRepository);
const createProduk = new CreateProduk(produkRepository);
const updateProduk = new UpdateProduk(produkRepository);
const deleteProduk = new DeleteProduk(produkRepository);

export const index = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await getAllProduk.execute({ page: page ? +page : undefined, limit: limit ? +limit : undefined });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const show = async (req, res, next) => {
  try {
    const result = await getProdukById.execute(parseInt(req.params.id));
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const store = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) data.gambar = req.file.path;
    if (data.harga) data.harga = parseFloat(data.harga);
    if (data.stok) data.stok = parseInt(data.stok);
    if (data.id_umkm) data.id_umkm = parseInt(data.id_umkm);
    const result = await createProduk.execute(data);
    res.json({ success: true, message: 'Produk ditambahkan', data: result });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) data.gambar = req.file.path;
    if (data.harga) data.harga = parseFloat(data.harga);
    if (data.stok) data.stok = parseInt(data.stok);
    if (data.id_umkm) data.id_umkm = parseInt(data.id_umkm);
    const result = await updateProduk.execute(parseInt(req.params.id), data);
    res.json({ success: true, message: 'Produk diupdate', data: result });
  } catch (err) { next(err); }
};

export const destroy = async (req, res, next) => {
  try {
    await deleteProduk.execute(parseInt(req.params.id));
    res.json({ success: true, message: 'Produk dihapus' });
  } catch (err) { next(err); }
};
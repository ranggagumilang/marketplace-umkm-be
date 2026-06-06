import fs from 'fs';
import path from 'path';

const controllers = {
  AuthController: `import { UserRepository } from '../../data/repositories/UserRepository.js';
import { AdminRepository } from '../../data/repositories/AdminRepository.js';
import { RegisterUser } from '../../domain/usecases/auth/RegisterUser.js';
import { LoginUser } from '../../domain/usecases/auth/LoginUser.js';
import { LoginAdmin } from '../../domain/usecases/auth/LoginAdmin.js';

const userRepository = new UserRepository();
const adminRepository = new AdminRepository();
const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository);
const loginAdmin = new LoginAdmin(adminRepository);

export const register = async (req, res, next) => {
  try {
    const result = await registerUser.execute(req.body);
    res.json({ success: true, message: 'Registrasi berhasil', data: result });
  } catch (error) { next(error); }
};

export const login = async (req, res, next) => {
  try {
    const result = await loginUser.execute(req.body);
    res.json({ success: true, message: 'Login berhasil', data: result });
  } catch (error) { next(error); }
};

export const loginAdminHandler = async (req, res, next) => {
  try {
    const result = await loginAdmin.execute(req.body);
    res.json({ success: true, message: 'Login Admin berhasil', data: result });
  } catch (error) { next(error); }
};`,

  UserController: `import { UserRepository } from '../../data/repositories/UserRepository.js';

const userRepository = new UserRepository();

export const index = async (req, res, next) => {
  try {
    const users = await userRepository.findAll();
    res.json({ success: true, data: users });
  } catch (error) { next(error); }
};

export const show = async (req, res, next) => {
  try {
    const user = await userRepository.findById(parseInt(req.params.id));
    if (!user) throw { statusCode: 404, message: 'User tidak ditemukan' };
    res.json({ success: true, data: user });
  } catch (error) { next(error); }
};

export const update = async (req, res, next) => {
  try {
    if (req.user.id !== parseInt(req.params.id) && req.user.role !== 'admin') {
      throw { statusCode: 403, message: 'Akses ditolak' };
    }
    const user = await userRepository.update(parseInt(req.params.id), req.body);
    res.json({ success: true, message: 'Profil diupdate', data: user });
  } catch (error) { next(error); }
};

export const destroy = async (req, res, next) => {
  try {
    await userRepository.delete(parseInt(req.params.id));
    res.json({ success: true, message: 'User dihapus' });
  } catch (error) { next(error); }
};`,

  AdminController: `import { AdminRepository } from '../../data/repositories/AdminRepository.js';
import { GetAdminProfile } from '../../domain/usecases/admin/GetAdminProfile.js';
import { UpdateAdminProfile } from '../../domain/usecases/admin/UpdateAdminProfile.js';

const adminRepository = new AdminRepository();
const getAdminProfile = new GetAdminProfile(adminRepository);
const updateAdminProfile = new UpdateAdminProfile(adminRepository);

export const profile = async (req, res, next) => {
  try {
    const result = await getAdminProfile.execute(req.user.id);
    res.json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const update = async (req, res, next) => {
  try {
    const result = await updateAdminProfile.execute(req.user.id, req.body);
    res.json({ success: true, message: 'Profil admin diupdate', data: result });
  } catch (error) { next(error); }
};`,

  ProdukController: `import { ProdukRepository } from '../../data/repositories/ProdukRepository.js';
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
    const data = { ...req.body, id_admin: req.user.id };
    if (req.file) data.gambar = req.file.path;
    if (data.harga) data.harga = parseFloat(data.harga);
    if (data.stok) data.stok = parseInt(data.stok);
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
    const result = await updateProduk.execute(parseInt(req.params.id), data);
    res.json({ success: true, message: 'Produk diupdate', data: result });
  } catch (err) { next(err); }
};

export const destroy = async (req, res, next) => {
  try {
    await deleteProduk.execute(parseInt(req.params.id));
    res.json({ success: true, message: 'Produk dihapus' });
  } catch (err) { next(err); }
};`,

  TransaksiController: `import { TransaksiRepository } from '../../data/repositories/TransaksiRepository.js';
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
    const result = await getAllTransaksi.execute();
    res.json({ success: true, data: result });
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
};`,

  NotifikasiController: `import { NotifikasiRepository } from '../../data/repositories/NotifikasiRepository.js';
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
};`,

  NewsController: `import { NewsRepository } from '../../data/repositories/NewsRepository.js';
import { GetAllNews } from '../../domain/usecases/news/GetAllNews.js';
import { GetNewsById } from '../../domain/usecases/news/GetNewsById.js';
import { CreateNews } from '../../domain/usecases/news/CreateNews.js';
import { UpdateNews } from '../../domain/usecases/news/UpdateNews.js';
import { DeleteNews } from '../../domain/usecases/news/DeleteNews.js';

const newsRepository = new NewsRepository();
const getAllNews = new GetAllNews(newsRepository);
const getNewsById = new GetNewsById(newsRepository);
const createNews = new CreateNews(newsRepository);
const updateNews = new UpdateNews(newsRepository);
const deleteNews = new DeleteNews(newsRepository);

export const index = async (req, res, next) => {
  try {
    const result = await getAllNews.execute();
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const show = async (req, res, next) => {
  try {
    const result = await getNewsById.execute(parseInt(req.params.id));
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const store = async (req, res, next) => {
  try {
    const data = { ...req.body, id_admin: req.user.id };
    const result = await createNews.execute(data);
    res.json({ success: true, message: 'Berita ditambahkan', data: result });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const result = await updateNews.execute(parseInt(req.params.id), req.body);
    res.json({ success: true, message: 'Berita diupdate', data: result });
  } catch (err) { next(err); }
};

export const destroy = async (req, res, next) => {
  try {
    await deleteNews.execute(parseInt(req.params.id));
    res.json({ success: true, message: 'Berita dihapus' });
  } catch (err) { next(err); }
};`,

  QrisController: `import { QrisConfigRepository } from '../../data/repositories/QrisConfigRepository.js';
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
};`
};

for (const [name, content] of Object.entries(controllers)) {
  fs.writeFileSync(path.join('src/presentation/controllers', name + '.js'), content);
}

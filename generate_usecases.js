import fs from 'fs';
import path from 'path';

const usecases = {
  auth: {
    RegisterUser: `import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class RegisterUser {
  constructor(userRepository) { this.userRepository = userRepository; }
  async execute(data) {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw { statusCode: 400, message: 'Email sudah terdaftar', errorCode: 'DUPLICATE_EMAIL' };
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.create({ ...data, password: hashedPassword });
    const token = jwt.sign({ id: user.id_user, role: 'user' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return { token, user: { id_user: user.id_user, nama: user.nama, email: user.email, role: 'user' } };
  }
}`,
    LoginUser: `import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class LoginUser {
  constructor(userRepository) { this.userRepository = userRepository; }
  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw { statusCode: 401, message: 'Email atau password salah', errorCode: 'INVALID_CREDENTIALS' };
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw { statusCode: 401, message: 'Email atau password salah', errorCode: 'INVALID_CREDENTIALS' };
    const token = jwt.sign({ id: user.id_user, role: 'user' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return { token, user: { id_user: user.id_user, nama: user.nama, email: user.email, role: 'user' } };
  }
}`,
    LoginAdmin: `import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class LoginAdmin {
  constructor(adminRepository) { this.adminRepository = adminRepository; }
  async execute({ email, password }) {
    const admin = await this.adminRepository.findByEmail(email);
    if (!admin) throw { statusCode: 401, message: 'Email atau password salah', errorCode: 'INVALID_CREDENTIALS' };
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) throw { statusCode: 401, message: 'Email atau password salah', errorCode: 'INVALID_CREDENTIALS' };
    const token = jwt.sign({ id: admin.id_admin, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return { token, admin: { id_admin: admin.id_admin, nama: admin.nama, email: admin.email, role: 'admin' } };
  }
}`
  },
  admin: {
    GetAdminProfile: `export class GetAdminProfile {
  constructor(adminRepository) { this.adminRepository = adminRepository; }
  async execute(id) {
    const admin = await this.adminRepository.findById(id);
    if (!admin) throw { statusCode: 404, message: 'Admin tidak ditemukan', errorCode: 'NOT_FOUND' };
    delete admin.password;
    return admin;
  }
}`,
    UpdateAdminProfile: `import bcrypt from 'bcryptjs';
export class UpdateAdminProfile {
  constructor(adminRepository) { this.adminRepository = adminRepository; }
  async execute(id, data) {
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    else delete data.password;
    const admin = await this.adminRepository.update(id, data);
    delete admin.password;
    return admin;
  }
}`
  },
  produk: {
    GetAllProduk: `export class GetAllProduk {
  constructor(produkRepository) { this.produkRepository = produkRepository; }
  async execute({ page = 1, limit = 12 } = {}) { return this.produkRepository.findAll({ page, limit }); }
}`,
    GetProdukById: `export class GetProdukById {
  constructor(produkRepository) { this.produkRepository = produkRepository; }
  async execute(id) { 
    const produk = await this.produkRepository.findById(id);
    if (!produk) throw { statusCode: 404, message: 'Produk tidak ditemukan', errorCode: 'NOT_FOUND' };
    return produk;
  }
}`,
    CreateProduk: `export class CreateProduk {
  constructor(produkRepository) { this.produkRepository = produkRepository; }
  async execute(data) { return this.produkRepository.create(data); }
}`,
    UpdateProduk: `export class UpdateProduk {
  constructor(produkRepository) { this.produkRepository = produkRepository; }
  async execute(id, data) { return this.produkRepository.update(id, data); }
}`,
    DeleteProduk: `export class DeleteProduk {
  constructor(produkRepository) { this.produkRepository = produkRepository; }
  async execute(id) { return this.produkRepository.delete(id); }
}`
  },
  transaksi: {
    CreateTransaksi: `export class CreateTransaksi {
  constructor(transaksiRepository) { this.transaksiRepository = transaksiRepository; }
  async execute(data) { return this.transaksiRepository.create(data); }
}`,
    GetTransaksiByUser: `export class GetTransaksiByUser {
  constructor(transaksiRepository) { this.transaksiRepository = transaksiRepository; }
  async execute(id_user) { return this.transaksiRepository.findByUser(id_user); }
}`,
    GetAllTransaksi: `export class GetAllTransaksi {
  constructor(transaksiRepository) { this.transaksiRepository = transaksiRepository; }
  async execute() { return this.transaksiRepository.findAll(); }
}`,
    UpdateStatusTransaksi: `export class UpdateStatusTransaksi {
  constructor(transaksiRepository) { this.transaksiRepository = transaksiRepository; }
  async execute(id, status) { return this.transaksiRepository.updateStatus(id, status); }
}`
  },
  notifikasi: {
    SendNotifikasi: `export class SendNotifikasi {
  constructor(notifikasiRepository) { this.notifikasiRepository = notifikasiRepository; }
  async execute(data) { return this.notifikasiRepository.create(data); }
}`,
    MarkAsRead: `export class MarkAsRead {
  constructor(notifikasiRepository) { this.notifikasiRepository = notifikasiRepository; }
  async execute(id) { return this.notifikasiRepository.markAsRead(id); }
}`,
    MarkAllAsRead: `export class MarkAllAsRead {
  constructor(notifikasiRepository) { this.notifikasiRepository = notifikasiRepository; }
  async execute(id_user) { return this.notifikasiRepository.markAllAsRead(id_user); }
}`
  },
  news: {
    GetAllNews: `export class GetAllNews {
  constructor(newsRepository) { this.newsRepository = newsRepository; }
  async execute() { return this.newsRepository.findAll(); }
}`,
    GetNewsById: `export class GetNewsById {
  constructor(newsRepository) { this.newsRepository = newsRepository; }
  async execute(id) { 
    const news = await this.newsRepository.findById(id);
    if (!news) throw { statusCode: 404, message: 'Berita tidak ditemukan', errorCode: 'NOT_FOUND' };
    return news;
  }
}`,
    CreateNews: `export class CreateNews {
  constructor(newsRepository) { this.newsRepository = newsRepository; }
  async execute(data) { return this.newsRepository.create(data); }
}`,
    UpdateNews: `export class UpdateNews {
  constructor(newsRepository) { this.newsRepository = newsRepository; }
  async execute(id, data) { return this.newsRepository.update(id, data); }
}`,
    DeleteNews: `export class DeleteNews {
  constructor(newsRepository) { this.newsRepository = newsRepository; }
  async execute(id) { return this.newsRepository.delete(id); }
}`
  },
  qris: {
    GetQrisConfig: `export class GetQrisConfig {
  constructor(qrisRepository) { this.qrisRepository = qrisRepository; }
  async execute() { return this.qrisRepository.get(); }
}`,
    UpdateQrisConfig: `export class UpdateQrisConfig {
  constructor(qrisRepository) { this.qrisRepository = qrisRepository; }
  async execute(data) { return this.qrisRepository.upsert(data); }
}`
  }
};

for (const [folder, files] of Object.entries(usecases)) {
  for (const [name, content] of Object.entries(files)) {
    fs.writeFileSync(path.join('src/domain/usecases', folder, name + '.js'), content);
  }
}

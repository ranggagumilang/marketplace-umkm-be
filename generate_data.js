import fs from 'fs';
import path from 'path';

const repos = {
  UserRepository: `import prisma from '../../infrastructure/database/prismaClient.js';
import { IUserRepository } from '../../domain/repositories/IUserRepository.js';

export class UserRepository extends IUserRepository {
  async findByEmail(email) { return prisma.user.findUnique({ where: { email } }); }
  async findById(id) { return prisma.user.findUnique({ where: { id_user: id } }); }
  async create(data) { return prisma.user.create({ data }); }
  async update(id, data) { return prisma.user.update({ where: { id_user: id }, data }); }
  async findAll() { return prisma.user.findMany(); }
  async delete(id) { return prisma.user.delete({ where: { id_user: id } }); }
}`,

  AdminRepository: `import prisma from '../../infrastructure/database/prismaClient.js';
import { IAdminRepository } from '../../domain/repositories/IAdminRepository.js';

export class AdminRepository extends IAdminRepository {
  async findByEmail(email) { return prisma.admin.findUnique({ where: { email } }); }
  async findById(id) { return prisma.admin.findUnique({ where: { id_admin: id } }); }
  async update(id, data) { return prisma.admin.update({ where: { id_admin: id }, data }); }
}`,

  ProdukRepository: `import prisma from '../../infrastructure/database/prismaClient.js';
import { IProdukRepository } from '../../domain/repositories/IProdukRepository.js';

export class ProdukRepository extends IProdukRepository {
  async findAll({ page, limit } = {}) {
    if (page && limit) {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        prisma.produk.findMany({ skip, take: limit, include: { admin: { select: { nama: true } } } }),
        prisma.produk.count()
      ]);
      return { data, meta: { total, page, limit } };
    }
    const data = await prisma.produk.findMany({ include: { admin: { select: { nama: true } } } });
    return { data };
  }
  async findById(id) { return prisma.produk.findUnique({ where: { id_produk: id }, include: { admin: { select: { nama: true } } } }); }
  async create(data) { return prisma.produk.create({ data }); }
  async update(id, data) { return prisma.produk.update({ where: { id_produk: id }, data }); }
  async delete(id) { return prisma.produk.delete({ where: { id_produk: id } }); }
}`,

  TransaksiRepository: `import prisma from '../../infrastructure/database/prismaClient.js';
import { ITransaksiRepository } from '../../domain/repositories/ITransaksiRepository.js';

export class TransaksiRepository extends ITransaksiRepository {
  async create(data) { return prisma.transaksi.create({ data, include: { detail_transaksi: true } }); }
  async findByUser(id_user) { return prisma.transaksi.findMany({ where: { id_user }, orderBy: { tanggal: 'desc' } }); }
  async findAll() { return prisma.transaksi.findMany({ include: { user: { select: { nama: true } } }, orderBy: { tanggal: 'desc' } }); }
  async findById(id) { return prisma.transaksi.findUnique({ where: { id_transaksi: id }, include: { detail_transaksi: { include: { produk: true } }, user: { select: { nama: true, email: true, alamat: true, no_hp: true } } } }); }
  async updateStatus(id, status) { return prisma.transaksi.update({ where: { id_transaksi: id }, data: { status } }); }
}`,

  DetailTransaksiRepository: `import prisma from '../../infrastructure/database/prismaClient.js';
import { IDetailTransaksiRepository } from '../../domain/repositories/IDetailTransaksiRepository.js';

export class DetailTransaksiRepository extends IDetailTransaksiRepository {
  async findByTransaksi(id_transaksi) { return prisma.detailTransaksi.findMany({ where: { id_transaksi }, include: { produk: true } }); }
  async createMany(data) { return prisma.detailTransaksi.createMany({ data }); }
}`,

  NotifikasiRepository: `import prisma from '../../infrastructure/database/prismaClient.js';
import { INotifikasiRepository } from '../../domain/repositories/INotifikasiRepository.js';

export class NotifikasiRepository extends INotifikasiRepository {
  async findByUser(id_user) { return prisma.notifikasi.findMany({ where: { id_user }, orderBy: { tanggal: 'desc' } }); }
  async markAsRead(id) { return prisma.notifikasi.update({ where: { id_notifikasi: id }, data: { status_baca: true } }); }
  async markAllAsRead(id_user) { return prisma.notifikasi.updateMany({ where: { id_user, status_baca: false }, data: { status_baca: true } }); }
  async create(data) { return prisma.notifikasi.create({ data }); }
}`,

  NewsRepository: `import prisma from '../../infrastructure/database/prismaClient.js';
import { INewsRepository } from '../../domain/repositories/INewsRepository.js';

export class NewsRepository extends INewsRepository {
  async findAll() { return prisma.news.findMany({ orderBy: { tanggal: 'desc' } }); }
  async findById(id) { return prisma.news.findUnique({ where: { id_news: id } }); }
  async create(data) { return prisma.news.create({ data }); }
  async update(id, data) { return prisma.news.update({ where: { id_news: id }, data }); }
  async delete(id) { return prisma.news.delete({ where: { id_news: id } }); }
}`,

  QrisConfigRepository: `import prisma from '../../infrastructure/database/prismaClient.js';
import { IQrisConfigRepository } from '../../domain/repositories/IQrisConfigRepository.js';

export class QrisConfigRepository extends IQrisConfigRepository {
  async get() { return prisma.qrisConfig.findFirst(); }
  async upsert(data) {
    const existing = await this.get();
    if (existing) {
      return prisma.qrisConfig.update({ where: { id: existing.id }, data });
    }
    return prisma.qrisConfig.create({ data });
  }
}`
};

for (const [name, content] of Object.entries(repos)) {
  fs.writeFileSync(path.join('src/data/repositories', name + '.js'), content);
}

import prisma from '../../infrastructure/database/prismaClient.js';
import { ITransaksiRepository } from '../../domain/repositories/ITransaksiRepository.js';

export class TransaksiRepository extends ITransaksiRepository {
  async create(data) { return prisma.transaksi.create({ data, include: { detail_transaksi: true } }); }
  async findByUser(id_user) { return prisma.transaksi.findMany({ where: { id_user }, orderBy: { tanggal: 'desc' } }); }
  async findAll({ page, limit } = {}) {
    if (page && limit) {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        prisma.transaksi.findMany({ skip, take: limit, include: { user: { select: { nama: true } } }, orderBy: { tanggal: 'desc' } }),
        prisma.transaksi.count()
      ]);
      return { data, meta: { total, page, limit } };
    }
    const data = await prisma.transaksi.findMany({ include: { user: { select: { nama: true } } }, orderBy: { tanggal: 'desc' } });
    return { data };
  }
  async findById(id) { return prisma.transaksi.findUnique({ where: { id_transaksi: id }, include: { detail_transaksi: { include: { produk: true } }, user: { select: { nama: true, email: true, alamat: true, no_hp: true } } } }); }
  async updateStatus(id, status) { return prisma.transaksi.update({ where: { id_transaksi: id }, data: { status } }); }
}
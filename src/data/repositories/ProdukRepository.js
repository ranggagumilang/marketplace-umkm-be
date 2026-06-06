import prisma from '../../infrastructure/database/prismaClient.js';
import { IProdukRepository } from '../../domain/repositories/IProdukRepository.js';

export class ProdukRepository extends IProdukRepository {
  async findAll({ page, limit } = {}) {
    if (page && limit) {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        prisma.produk.findMany({ skip, take: limit, include: { umkm: true } }),
        prisma.produk.count()
      ]);
      return { data, meta: { total, page, limit } };
    }
    const data = await prisma.produk.findMany({ include: { umkm: true } });
    return { data };
  }
  async findById(id) { return prisma.produk.findUnique({ where: { id_produk: id }, include: { umkm: true } }); }
  async create(data) { return prisma.produk.create({ data }); }
  async update(id, data) { return prisma.produk.update({ where: { id_produk: id }, data }); }
  async delete(id) { return prisma.produk.delete({ where: { id_produk: id } }); }
}
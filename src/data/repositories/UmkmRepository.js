import prisma from '../../infrastructure/database/prismaClient.js';
import { IUmkmRepository } from '../../domain/repositories/IUmkmRepository.js';

export class UmkmRepository extends IUmkmRepository {
  async findAll({ page, limit } = {}) {
    if (page && limit) {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        prisma.umkm.findMany({ skip, take: limit, include: { produk: true } }),
        prisma.umkm.count()
      ]);
      return { data, meta: { total, page, limit } };
    }
    const data = await prisma.umkm.findMany({ include: { produk: true } });
    return { data };
  }

  async findById(id) {
    return prisma.umkm.findUnique({
      where: { id_umkm: id },
      include: {
        produk: true,
        admin: { select: { nama: true } }
      }
    });
  }

  async create(data) {
    return prisma.umkm.create({ data });
  }

  async update(id, data) {
    return prisma.umkm.update({
      where: { id_umkm: id },
      data
    });
  }

  async delete(id) {
    return prisma.umkm.delete({
      where: { id_umkm: id }
    });
  }
}

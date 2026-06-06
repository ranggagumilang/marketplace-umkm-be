import prisma from '../../infrastructure/database/prismaClient.js';
import { IDetailTransaksiRepository } from '../../domain/repositories/IDetailTransaksiRepository.js';

export class DetailTransaksiRepository extends IDetailTransaksiRepository {
  async findByTransaksi(id_transaksi) { return prisma.detailTransaksi.findMany({ where: { id_transaksi }, include: { produk: true } }); }
  async createMany(data) { return prisma.detailTransaksi.createMany({ data }); }
}
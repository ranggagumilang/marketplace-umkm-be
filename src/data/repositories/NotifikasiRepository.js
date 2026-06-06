import prisma from '../../infrastructure/database/prismaClient.js';
import { INotifikasiRepository } from '../../domain/repositories/INotifikasiRepository.js';

export class NotifikasiRepository extends INotifikasiRepository {
  async findByUser(id_user) { return prisma.notifikasi.findMany({ where: { id_user }, orderBy: { tanggal: 'desc' } }); }
  async markAsRead(id) { return prisma.notifikasi.update({ where: { id_notifikasi: id }, data: { status_baca: true } }); }
  async markAllAsRead(id_user) { return prisma.notifikasi.updateMany({ where: { id_user, status_baca: false }, data: { status_baca: true } }); }
  async create(data) { return prisma.notifikasi.create({ data }); }
}
import prisma from '../../infrastructure/database/prismaClient.js';
import { IAdminRepository } from '../../domain/repositories/IAdminRepository.js';

export class AdminRepository extends IAdminRepository {
  async findByEmail(email) { return prisma.admin.findUnique({ where: { email } }); }
  async findById(id) { return prisma.admin.findUnique({ where: { id_admin: id } }); }
  async update(id, data) { return prisma.admin.update({ where: { id_admin: id }, data }); }
}
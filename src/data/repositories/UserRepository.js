import prisma from '../../infrastructure/database/prismaClient.js';
import { IUserRepository } from '../../domain/repositories/IUserRepository.js';

export class UserRepository extends IUserRepository {
  async findByEmail(email) { return prisma.user.findUnique({ where: { email } }); }
  async findById(id) { return prisma.user.findUnique({ where: { id_user: id } }); }
  async create(data) { return prisma.user.create({ data }); }
  async update(id, data) { return prisma.user.update({ where: { id_user: id }, data }); }
  async findAll() { return prisma.user.findMany(); }
  async delete(id) { return prisma.user.delete({ where: { id_user: id } }); }
}
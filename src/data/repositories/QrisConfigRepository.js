import prisma from '../../infrastructure/database/prismaClient.js';
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
}
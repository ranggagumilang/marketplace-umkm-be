import prisma from '../../infrastructure/database/prismaClient.js';
import { INewsRepository } from '../../domain/repositories/INewsRepository.js';

export class NewsRepository extends INewsRepository {
  async findAll({ page, limit } = {}) {
    if (page && limit) {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        prisma.news.findMany({ skip, take: limit, orderBy: { tanggal: 'desc' } }),
        prisma.news.count()
      ]);
      return { data, meta: { total, page, limit } };
    }
    const data = await prisma.news.findMany({ orderBy: { tanggal: 'desc' } });
    return { data };
  }
  async findById(id) { return prisma.news.findUnique({ where: { id_news: id } }); }
  async create(data) { return prisma.news.create({ data }); }
  async update(id, data) { return prisma.news.update({ where: { id_news: id }, data }); }
  async delete(id) { return prisma.news.delete({ where: { id_news: id } }); }
}
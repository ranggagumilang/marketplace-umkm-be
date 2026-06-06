export class GetNewsById {
  constructor(newsRepository) { this.newsRepository = newsRepository; }
  async execute(id) { 
    const news = await this.newsRepository.findById(id);
    if (!news) throw { statusCode: 404, message: 'Berita tidak ditemukan', errorCode: 'NOT_FOUND' };
    return news;
  }
}
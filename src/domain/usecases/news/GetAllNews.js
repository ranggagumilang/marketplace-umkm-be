export class GetAllNews {
  constructor(newsRepository) { this.newsRepository = newsRepository; }
  async execute({ page = 1, limit = 10 } = {}) { return this.newsRepository.findAll({ page, limit }); }
}
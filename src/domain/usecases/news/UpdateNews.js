export class UpdateNews {
  constructor(newsRepository) { this.newsRepository = newsRepository; }
  async execute(id, data) { return this.newsRepository.update(id, data); }
}
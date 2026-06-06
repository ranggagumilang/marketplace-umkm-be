export class DeleteNews {
  constructor(newsRepository) { this.newsRepository = newsRepository; }
  async execute(id) { return this.newsRepository.delete(id); }
}
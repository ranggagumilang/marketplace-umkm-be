export class CreateNews {
  constructor(newsRepository) { this.newsRepository = newsRepository; }
  async execute(data) { return this.newsRepository.create(data); }
}
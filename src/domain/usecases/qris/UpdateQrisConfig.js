export class UpdateQrisConfig {
  constructor(qrisRepository) { this.qrisRepository = qrisRepository; }
  async execute(data) { return this.qrisRepository.upsert(data); }
}
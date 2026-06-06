export class GetQrisConfig {
  constructor(qrisRepository) { this.qrisRepository = qrisRepository; }
  async execute() { return this.qrisRepository.get(); }
}
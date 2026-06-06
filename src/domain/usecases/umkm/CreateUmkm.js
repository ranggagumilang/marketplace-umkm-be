export class CreateUmkm {
  constructor(umkmRepository) { this.umkmRepository = umkmRepository; }
  async execute(data) { return this.umkmRepository.create(data); }
}

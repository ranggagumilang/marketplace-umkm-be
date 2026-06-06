export class GetAllUmkm {
  constructor(umkmRepository) { this.umkmRepository = umkmRepository; }
  async execute({ page = 1, limit = 10 } = {}) { return this.umkmRepository.findAll({ page, limit }); }
}

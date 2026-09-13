export class GetAllProduk {
  constructor(produkRepository) { this.produkRepository = produkRepository; }
  async execute({ page = 1, limit = 12 } = {}) { return this.produkRepository.findAll({ page, limit }); }
}
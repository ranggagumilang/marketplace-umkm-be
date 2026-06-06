export class GetAllProduk {
  constructor(produkRepository) { this.produkRepository = produkRepository; }
  async execute({ page = 1, limit = 10 } = {}) { return this.produkRepository.findAll({ page, limit }); }
}
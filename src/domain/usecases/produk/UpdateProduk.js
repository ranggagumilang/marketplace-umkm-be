export class UpdateProduk {
  constructor(produkRepository) { this.produkRepository = produkRepository; }
  async execute(id, data) { return this.produkRepository.update(id, data); }
}
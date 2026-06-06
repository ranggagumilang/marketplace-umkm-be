export class CreateProduk {
  constructor(produkRepository) { this.produkRepository = produkRepository; }
  async execute(data) { return this.produkRepository.create(data); }
}
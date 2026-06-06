export class DeleteProduk {
  constructor(produkRepository) { this.produkRepository = produkRepository; }
  async execute(id) { return this.produkRepository.delete(id); }
}
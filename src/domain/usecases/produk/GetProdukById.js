export class GetProdukById {
  constructor(produkRepository) { this.produkRepository = produkRepository; }
  async execute(id) { 
    const produk = await this.produkRepository.findById(id);
    if (!produk) throw { statusCode: 404, message: 'Produk tidak ditemukan', errorCode: 'NOT_FOUND' };
    return produk;
  }
}
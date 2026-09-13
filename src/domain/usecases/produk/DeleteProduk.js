export class DeleteProduk {
  constructor(produkRepository) { this.produkRepository = produkRepository; }
  async execute(id) {
    const produk = await this.produkRepository.findById(id);
    if (!produk) throw { statusCode: 404, message: 'Produk tidak ditemukan', errorCode: 'NOT_FOUND' };
    if (produk.detail_transaksi && produk.detail_transaksi.length > 0) {
      throw {
        statusCode: 400,
        message: `Tidak dapat menghapus produk "${produk.nama_produk}" karena telah tercatat dalam riwayat transaksi pembelian. Produk yang memiliki transaksi tidak dapat dihapus demi integritas data laporan penjualan.`,
        errorCode: 'PRODUK_HAS_TRANSACTIONS'
      };
    }
    return this.produkRepository.delete(id);
  }
}
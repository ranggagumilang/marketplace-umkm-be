export class DeleteUmkm {
  constructor(umkmRepository) { this.umkmRepository = umkmRepository; }
  async execute(id) {
    const umkm = await this.umkmRepository.findById(id);
    if (!umkm) throw { statusCode: 404, message: 'UMKM tidak ditemukan', errorCode: 'NOT_FOUND' };
    if (umkm.produk && umkm.produk.length > 0) {
      throw {
        statusCode: 400,
        message: `Tidak dapat menghapus UMKM "${umkm.nama_umkm}" karena masih memiliki ${umkm.produk.length} produk terdaftar. Hapus semua produk UMKM ini terlebih dahulu di menu Kelola Produk.`,
        errorCode: 'UMKM_HAS_PRODUCTS'
      };
    }
    return this.umkmRepository.delete(id);
  }
}

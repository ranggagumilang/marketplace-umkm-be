export class Produk {
  constructor({ id_produk, nama_produk, deskripsi, harga, stok, gambar, id_umkm, created_at }) {
    this.id_produk = id_produk;
    this.nama_produk = nama_produk;
    this.deskripsi = deskripsi;
    this.harga = harga;
    this.stok = stok;
    this.gambar = gambar;
    this.id_umkm = id_umkm;
    this.created_at = created_at;
  }
}

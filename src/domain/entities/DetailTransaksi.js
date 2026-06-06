export class DetailTransaksi {
  constructor({ id_detail, jumlah, subtotal, id_transaksi, id_produk, created_at }) {
    this.id_detail = id_detail;
    this.jumlah = jumlah;
    this.subtotal = subtotal;
    this.id_transaksi = id_transaksi;
    this.id_produk = id_produk;
    this.created_at = created_at;
  }
}

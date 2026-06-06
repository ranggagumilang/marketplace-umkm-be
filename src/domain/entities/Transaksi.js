export class Transaksi {
  constructor({ id_transaksi, tanggal, total_harga, metode_pembayaran, status, id_user }) {
    this.id_transaksi = id_transaksi;
    this.tanggal = tanggal;
    this.total_harga = total_harga;
    this.metode_pembayaran = metode_pembayaran;
    this.status = status;
    this.id_user = id_user;
  }
}

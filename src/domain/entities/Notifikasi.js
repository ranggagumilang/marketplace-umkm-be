export class Notifikasi {
  constructor({ id_notifikasi, pesan, status_baca, tanggal, id_user }) {
    this.id_notifikasi = id_notifikasi;
    this.pesan = pesan;
    this.status_baca = status_baca;
    this.tanggal = tanggal;
    this.id_user = id_user;
  }
}

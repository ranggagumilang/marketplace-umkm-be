export class News {
  constructor({ id_news, judul, isi, lokasi, tanggal, id_admin }) {
    this.id_news = id_news;
    this.judul = judul;
    this.isi = isi;
    this.lokasi = lokasi;
    this.tanggal = tanggal;
    this.id_admin = id_admin;
  }
}

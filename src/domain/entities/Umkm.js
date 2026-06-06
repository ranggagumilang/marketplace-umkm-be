export class Umkm {
  constructor({
    id_umkm,
    nama_umkm,
    pemilik,
    desa,
    dusun,
    kecamatan,
    kategori,
    status_pendampingan,
    deskripsi,
    logo,
    kontak,
    id_admin,
    created_at
  }) {
    this.id_umkm = id_umkm;
    this.nama_umkm = nama_umkm;
    this.pemilik = pemilik;
    this.desa = desa;
    this.dusun = dusun;
    this.kecamatan = kecamatan || 'Wongsorejo';
    this.kategori = kategori;
    this.status_pendampingan = status_pendampingan;
    this.deskripsi = deskripsi;
    this.logo = logo;
    this.kontak = kontak;
    this.id_admin = id_admin;
    this.created_at = created_at;
  }
}

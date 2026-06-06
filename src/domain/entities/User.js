export class User {
  constructor({ id_user, nama, email, password, alamat, no_hp, created_at }) {
    this.id_user = id_user;
    this.nama = nama;
    this.email = email;
    this.password = password;
    this.alamat = alamat;
    this.no_hp = no_hp;
    this.created_at = created_at;
  }
}

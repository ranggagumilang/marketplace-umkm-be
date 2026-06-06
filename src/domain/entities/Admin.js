export class Admin {
  constructor({ id_admin, nama, email, password, created_at }) {
    this.id_admin = id_admin;
    this.nama = nama;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
  }
}

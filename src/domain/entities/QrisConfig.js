export class QrisConfig {
  constructor({ id, gambar_url, cloudinary_public_id, updated_at, id_admin }) {
    this.id = id;
    this.gambar_url = gambar_url;
    this.cloudinary_public_id = cloudinary_public_id;
    this.updated_at = updated_at;
    this.id_admin = id_admin;
  }
}

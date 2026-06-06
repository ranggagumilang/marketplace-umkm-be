import fs from 'fs';
import path from 'path';

const entities = {
  User: ['id_user', 'nama', 'email', 'password', 'alamat', 'no_hp', 'created_at'],
  Admin: ['id_admin', 'nama', 'email', 'password', 'created_at'],
  Produk: ['id_produk', 'nama_produk', 'deskripsi', 'harga', 'stok', 'gambar', 'id_admin', 'created_at'],
  Transaksi: ['id_transaksi', 'tanggal', 'total_harga', 'metode_pembayaran', 'status', 'id_user'],
  DetailTransaksi: ['id_detail', 'jumlah', 'subtotal', 'id_transaksi', 'id_produk', 'created_at'],
  Notifikasi: ['id_notifikasi', 'pesan', 'status_baca', 'tanggal', 'id_user'],
  News: ['id_news', 'judul', 'isi', 'lokasi', 'tanggal', 'id_admin'],
  QrisConfig: ['id', 'gambar_url', 'cloudinary_public_id', 'updated_at', 'id_admin']
};

for (const [name, fields] of Object.entries(entities)) {
  const content = `export class ${name} {
  constructor({ ${fields.join(', ')} }) {
${fields.map(f => `    this.${f} = ${f};`).join('\n')}
  }
}
`;
  fs.writeFileSync(path.join('src/domain/entities', `${name}.js`), content);
}

// Generate Interfaces
const interfaces = {
  IUserRepository: ['findByEmail(email)', 'findById(id)', 'create(data)', 'update(id, data)', 'findAll()', 'delete(id)'],
  IAdminRepository: ['findByEmail(email)', 'findById(id)', 'update(id, data)'],
  IProdukRepository: ['findAll(params)', 'findById(id)', 'create(data)', 'update(id, data)', 'delete(id)'],
  ITransaksiRepository: ['create(data)', 'findByUser(id_user)', 'findAll()', 'findById(id)', 'updateStatus(id, status)'],
  IDetailTransaksiRepository: ['findByTransaksi(id_transaksi)', 'createMany(data)'],
  INotifikasiRepository: ['findByUser(id_user)', 'markAsRead(id)', 'markAllAsRead(id_user)', 'create(data)'],
  INewsRepository: ['findAll()', 'findById(id)', 'create(data)', 'update(id, data)', 'delete(id)'],
  IQrisConfigRepository: ['get()', 'upsert(data)']
};

for (const [name, methods] of Object.entries(interfaces)) {
  const content = `export class ${name} {
${methods.map(m => `  async ${m} { throw new Error('Not implemented'); }`).join('\n')}
}
`;
  fs.writeFileSync(path.join('src/domain/repositories', `${name}.js`), content);
}

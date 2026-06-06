export class GetTransaksiByUser {
  constructor(transaksiRepository) { this.transaksiRepository = transaksiRepository; }
  async execute(id_user) { return this.transaksiRepository.findByUser(id_user); }
}
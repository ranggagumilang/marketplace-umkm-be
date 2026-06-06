export class UpdateStatusTransaksi {
  constructor(transaksiRepository) { this.transaksiRepository = transaksiRepository; }
  async execute(id, status) { return this.transaksiRepository.updateStatus(id, status); }
}
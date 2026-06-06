export class GetAllTransaksi {
  constructor(transaksiRepository) { this.transaksiRepository = transaksiRepository; }
  async execute({ page = 1, limit = 10 } = {}) { return this.transaksiRepository.findAll({ page, limit }); }
}
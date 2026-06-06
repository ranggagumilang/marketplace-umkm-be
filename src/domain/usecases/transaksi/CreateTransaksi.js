export class CreateTransaksi {
  constructor(transaksiRepository) { this.transaksiRepository = transaksiRepository; }
  async execute(data) { return this.transaksiRepository.create(data); }
}
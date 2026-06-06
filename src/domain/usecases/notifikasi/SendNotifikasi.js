export class SendNotifikasi {
  constructor(notifikasiRepository) { this.notifikasiRepository = notifikasiRepository; }
  async execute(data) { return this.notifikasiRepository.create(data); }
}
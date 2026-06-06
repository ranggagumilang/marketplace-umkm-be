export class MarkAsRead {
  constructor(notifikasiRepository) { this.notifikasiRepository = notifikasiRepository; }
  async execute(id) { return this.notifikasiRepository.markAsRead(id); }
}
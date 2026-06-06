export class MarkAllAsRead {
  constructor(notifikasiRepository) { this.notifikasiRepository = notifikasiRepository; }
  async execute(id_user) { return this.notifikasiRepository.markAllAsRead(id_user); }
}
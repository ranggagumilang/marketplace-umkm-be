export class DeleteUmkm {
  constructor(umkmRepository) { this.umkmRepository = umkmRepository; }
  async execute(id) {
    const umkm = await this.umkmRepository.findById(id);
    if (!umkm) throw { statusCode: 404, message: 'UMKM tidak ditemukan', errorCode: 'NOT_FOUND' };
    return this.umkmRepository.delete(id);
  }
}

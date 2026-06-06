export class UpdateUmkm {
  constructor(umkmRepository) { this.umkmRepository = umkmRepository; }
  async execute(id, data) {
    const umkm = await this.umkmRepository.findById(id);
    if (!umkm) throw { statusCode: 404, message: 'UMKM tidak ditemukan', errorCode: 'NOT_FOUND' };
    return this.umkmRepository.update(id, data);
  }
}

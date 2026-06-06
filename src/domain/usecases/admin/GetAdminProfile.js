export class GetAdminProfile {
  constructor(adminRepository) { this.adminRepository = adminRepository; }
  async execute(id) {
    const admin = await this.adminRepository.findById(id);
    if (!admin) throw { statusCode: 404, message: 'Admin tidak ditemukan', errorCode: 'NOT_FOUND' };
    delete admin.password;
    return admin;
  }
}
import bcrypt from 'bcryptjs';
export class UpdateAdminProfile {
  constructor(adminRepository) { this.adminRepository = adminRepository; }
  async execute(id, data) {
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    else delete data.password;
    const admin = await this.adminRepository.update(id, data);
    delete admin.password;
    return admin;
  }
}
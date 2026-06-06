import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class LoginAdmin {
  constructor(adminRepository) { this.adminRepository = adminRepository; }
  async execute({ email, password }) {
    const admin = await this.adminRepository.findByEmail(email);
    if (!admin) throw { statusCode: 401, message: 'Email atau password salah', errorCode: 'INVALID_CREDENTIALS' };
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) throw { statusCode: 401, message: 'Email atau password salah', errorCode: 'INVALID_CREDENTIALS' };
    const token = jwt.sign({ id: admin.id_admin, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return { token, admin: { id_admin: admin.id_admin, nama: admin.nama, email: admin.email, role: 'admin' } };
  }
}
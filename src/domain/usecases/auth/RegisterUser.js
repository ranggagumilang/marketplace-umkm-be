import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class RegisterUser {
  constructor(userRepository) { this.userRepository = userRepository; }
  async execute(data) {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw { statusCode: 400, message: 'Email sudah terdaftar', errorCode: 'DUPLICATE_EMAIL' };
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.create({ ...data, password: hashedPassword });
    const token = jwt.sign({ id: user.id_user, role: 'user' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return { token, user: { id_user: user.id_user, nama: user.nama, email: user.email, role: 'user' } };
  }
}
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class LoginUser {
  constructor(userRepository) { this.userRepository = userRepository; }
  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw { statusCode: 401, message: 'Email atau password salah', errorCode: 'INVALID_CREDENTIALS' };
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw { statusCode: 401, message: 'Email atau password salah', errorCode: 'INVALID_CREDENTIALS' };
    const token = jwt.sign({ id: user.id_user, role: 'user' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return { token, user: { id_user: user.id_user, nama: user.nama, email: user.email, role: 'user' } };
  }
}
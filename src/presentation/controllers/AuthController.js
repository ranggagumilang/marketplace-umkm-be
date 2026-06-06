import { UserRepository } from '../../data/repositories/UserRepository.js';
import { AdminRepository } from '../../data/repositories/AdminRepository.js';
import { RegisterUser } from '../../domain/usecases/auth/RegisterUser.js';
import { LoginUser } from '../../domain/usecases/auth/LoginUser.js';
import { LoginAdmin } from '../../domain/usecases/auth/LoginAdmin.js';

const userRepository = new UserRepository();
const adminRepository = new AdminRepository();
const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository);
const loginAdmin = new LoginAdmin(adminRepository);

// Simple input sanitization
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>"'&]/g, '');
};

// Email format validation
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Password strength check (min 6 chars)
const isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 6;
};

export const register = async (req, res, next) => {
  try {
    const { nama, email, password } = req.body;

    // Input validation
    if (!nama || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nama, email, dan password wajib diisi',
        error: 'VALIDATION_ERROR'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Format email tidak valid',
        error: 'VALIDATION_ERROR'
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password minimal 6 karakter',
        error: 'VALIDATION_ERROR'
      });
    }

    const sanitizedData = {
      nama: sanitizeInput(nama),
      email: email.toLowerCase().trim(),
      password,
    };

    const result = await registerUser.execute(sanitizedData);
    res.json({ success: true, message: 'Registrasi berhasil', data: result });
  } catch (error) { next(error); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password wajib diisi',
        error: 'VALIDATION_ERROR'
      });
    }

    const result = await loginUser.execute({
      email: email.toLowerCase().trim(),
      password,
    });
    res.json({ success: true, message: 'Login berhasil', data: result });
  } catch (error) { next(error); }
};

export const loginAdminHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password wajib diisi',
        error: 'VALIDATION_ERROR'
      });
    }

    const result = await loginAdmin.execute({
      email: email.toLowerCase().trim(),
      password,
    });
    res.json({ success: true, message: 'Login Admin berhasil', data: result });
  } catch (error) { next(error); }
};
import { UserRepository } from '../../data/repositories/UserRepository.js';

const userRepository = new UserRepository();

export const index = async (req, res, next) => {
  try {
    const users = await userRepository.findAll();
    res.json({ success: true, data: users });
  } catch (error) { next(error); }
};

export const show = async (req, res, next) => {
  try {
    const user = await userRepository.findById(parseInt(req.params.id));
    if (!user) throw { statusCode: 404, message: 'User tidak ditemukan' };
    res.json({ success: true, data: user });
  } catch (error) { next(error); }
};

export const update = async (req, res, next) => {
  try {
    if (req.user.id !== parseInt(req.params.id) && req.user.role !== 'admin') {
      throw { statusCode: 403, message: 'Akses ditolak' };
    }
    const user = await userRepository.update(parseInt(req.params.id), req.body);
    res.json({ success: true, message: 'Profil diupdate', data: user });
  } catch (error) { next(error); }
};

export const destroy = async (req, res, next) => {
  try {
    await userRepository.delete(parseInt(req.params.id));
    res.json({ success: true, message: 'User dihapus' });
  } catch (error) { next(error); }
};
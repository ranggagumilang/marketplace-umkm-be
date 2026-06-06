import { AdminRepository } from '../../data/repositories/AdminRepository.js';
import { GetAdminProfile } from '../../domain/usecases/admin/GetAdminProfile.js';
import { UpdateAdminProfile } from '../../domain/usecases/admin/UpdateAdminProfile.js';

const adminRepository = new AdminRepository();
const getAdminProfile = new GetAdminProfile(adminRepository);
const updateAdminProfile = new UpdateAdminProfile(adminRepository);

export const profile = async (req, res, next) => {
  try {
    const result = await getAdminProfile.execute(req.user.id);
    res.json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const update = async (req, res, next) => {
  try {
    const result = await updateAdminProfile.execute(req.user.id, req.body);
    res.json({ success: true, message: 'Profil admin diupdate', data: result });
  } catch (error) { next(error); }
};
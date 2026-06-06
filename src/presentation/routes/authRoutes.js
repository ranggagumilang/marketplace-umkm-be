import { Router } from 'express';
import { register, login, loginAdminHandler } from '../controllers/AuthController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin/login', loginAdminHandler);

export default router;
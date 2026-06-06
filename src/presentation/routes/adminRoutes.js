import { Router } from 'express';
import { profile, update } from '../controllers/AdminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = Router();

router.get('/profile', authMiddleware, adminMiddleware, profile);
router.put('/profile', authMiddleware, adminMiddleware, update);

export default router;
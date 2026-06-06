import { Router } from 'express';
import { show, upsert } from '../controllers/QrisController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js';

const router = Router();

router.get('/', show);
router.post('/', authMiddleware, adminMiddleware, uploadMiddleware.single('qr_image'), upsert);

export default router;
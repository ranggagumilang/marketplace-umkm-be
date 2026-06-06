import { Router } from 'express';
import { index, markRead, markAllRead, send } from '../controllers/NotifikasiController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = Router();

router.get('/', authMiddleware, index);
router.put('/baca-semua', authMiddleware, markAllRead);
router.put('/:id/baca', authMiddleware, markRead);
router.post('/', authMiddleware, adminMiddleware, send);

export default router;
import { Router } from 'express';
import { index, all, show, store, updateStatus, detail } from '../controllers/TransaksiController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = Router();

router.get('/', authMiddleware, index);
router.get('/all', authMiddleware, adminMiddleware, all);
router.get('/:id', authMiddleware, show);
router.post('/', authMiddleware, store);
router.put('/:id/status', authMiddleware, adminMiddleware, updateStatus);
router.get('/:id/detail', authMiddleware, detail);

export default router;
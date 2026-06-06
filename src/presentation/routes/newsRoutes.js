import { Router } from 'express';
import { index, show, store, update, destroy } from '../controllers/NewsController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', authMiddleware, adminMiddleware, store);
router.put('/:id', authMiddleware, adminMiddleware, update);
router.delete('/:id', authMiddleware, adminMiddleware, destroy);

export default router;
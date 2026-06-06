import { Router } from 'express';
import { index, show, update, destroy } from '../controllers/UserController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = Router();

router.get('/', authMiddleware, adminMiddleware, index);
router.get('/:id', authMiddleware, adminMiddleware, show);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, adminMiddleware, destroy);

export default router;
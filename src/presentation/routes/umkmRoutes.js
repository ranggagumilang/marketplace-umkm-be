import { Router } from 'express';
import { index, show, store, update, destroy } from '../controllers/UmkmController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js';

const router = Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', authMiddleware, adminMiddleware, uploadMiddleware.single('logo'), store);
router.put('/:id', authMiddleware, adminMiddleware, uploadMiddleware.single('logo'), update);
router.delete('/:id', authMiddleware, adminMiddleware, destroy);

export default router;

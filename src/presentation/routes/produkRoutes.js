import { Router } from 'express';
import { index, show, store, update, destroy } from '../controllers/ProdukController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js';

const router = Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', authMiddleware, adminMiddleware, uploadMiddleware.single('gambar'), store);
router.put('/:id', authMiddleware, adminMiddleware, uploadMiddleware.single('gambar'), update);
router.delete('/:id', authMiddleware, adminMiddleware, destroy);

export default router;
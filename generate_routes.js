import fs from 'fs';
import path from 'path';

const routes = {
  authRoutes: `import { Router } from 'express';
import { register, login, loginAdminHandler } from '../controllers/AuthController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin/login', loginAdminHandler);

export default router;`,

  userRoutes: `import { Router } from 'express';
import { index, show, update, destroy } from '../controllers/UserController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = Router();

router.get('/', authMiddleware, adminMiddleware, index);
router.get('/:id', authMiddleware, adminMiddleware, show);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, adminMiddleware, destroy);

export default router;`,

  adminRoutes: `import { Router } from 'express';
import { profile, update } from '../controllers/AdminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = Router();

router.get('/profile', authMiddleware, adminMiddleware, profile);
router.put('/profile', authMiddleware, adminMiddleware, update);

export default router;`,

  produkRoutes: `import { Router } from 'express';
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

export default router;`,

  transaksiRoutes: `import { Router } from 'express';
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

export default router;`,

  notifikasiRoutes: `import { Router } from 'express';
import { index, markRead, markAllRead, send } from '../controllers/NotifikasiController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = Router();

router.get('/', authMiddleware, index);
router.put('/baca-semua', authMiddleware, markAllRead);
router.put('/:id/baca', authMiddleware, markRead);
router.post('/', authMiddleware, adminMiddleware, send);

export default router;`,

  newsRoutes: `import { Router } from 'express';
import { index, show, store, update, destroy } from '../controllers/NewsController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', authMiddleware, adminMiddleware, store);
router.put('/:id', authMiddleware, adminMiddleware, update);
router.delete('/:id', authMiddleware, adminMiddleware, destroy);

export default router;`,

  qrisRoutes: `import { Router } from 'express';
import { show, upsert } from '../controllers/QrisController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js';

const router = Router();

router.get('/', show);
router.post('/', authMiddleware, adminMiddleware, uploadMiddleware.single('qr_image'), upsert);

export default router;`
};

for (const [name, content] of Object.entries(routes)) {
  fs.writeFileSync(path.join('src/presentation/routes', name + '.js'), content);
}

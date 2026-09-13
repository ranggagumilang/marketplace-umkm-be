import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { securityMiddleware } from './security.js';
import { globalRateLimiter, authRateLimiter, adminRateLimiter } from './rateLimiter.js';
import authRoutes from '../presentation/routes/authRoutes.js';
import userRoutes from '../presentation/routes/userRoutes.js';
import adminRoutes from '../presentation/routes/adminRoutes.js';
import produkRoutes from '../presentation/routes/produkRoutes.js';
import transaksiRoutes from '../presentation/routes/transaksiRoutes.js';
import notifikasiRoutes from '../presentation/routes/notifikasiRoutes.js';
import newsRoutes from '../presentation/routes/newsRoutes.js';
import qrisRoutes from '../presentation/routes/qrisRoutes.js';
import umkmRoutes from '../presentation/routes/umkmRoutes.js';
import { errorHandler } from '../presentation/middlewares/errorHandler.js';

dotenv.config();

const app = express();

// ─── TRUST PROXY (RENDER / REVERSE PROXY) ──────
app.set('trust proxy', 1);

// ─── SECURITY MIDDLEWARE ───────────────────────
app.use(securityMiddleware);

// ─── CORS ──────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ─── BODY PARSER ───────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ─── LOGGING ───────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ─── GLOBAL RATE LIMITER ──────────────────────
app.use(globalRateLimiter);

// ─── ROUTES ───────────────────────────────────
app.use('/api/auth', authRateLimiter, authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/produk', produkRoutes);
app.use('/api/umkm', umkmRoutes);
app.use('/api/transaksi', transaksiRoutes);
app.use('/api/notifikasi', notifikasiRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/qris', qrisRoutes);

// ─── 404 HANDLER ──────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
    error: 'NOT_FOUND',
  });
});

// ─── ERROR HANDLER ────────────────────────────
app.use(errorHandler);

// ─── START SERVER ─────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

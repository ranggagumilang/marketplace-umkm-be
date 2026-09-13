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

// ─── CORS MULTI-LAYER & DYNAMIC LOCALHOST ──────
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://marketplace-umkm-fe.vercel.app',
  'https://umkm-marketplace-frontend.vercel.app',
].filter(Boolean);

const isOriginAllowed = (origin) => {
  // Layer 1: Non-browser, mobile apps, curl, Postman (tidak ada origin header)
  if (!origin) return true;
  
  // Layer 2: Whitelist domain Vercel & Production spesifik
  if (allowedOrigins.includes(origin)) return true;
  
  // Layer 3: FE Lokal port APAPUN (localhost:* atau 127.0.0.1:*)
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return true;
  
  // Layer 4: Semua preview & deployment domain Vercel
  if (/^https:\/\/([a-zA-Z0-9_-]+\.)?vercel\.app$/.test(origin)) return true;
  
  return false;
};

app.use(cors({
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
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

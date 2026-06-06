import rateLimit from 'express-rate-limit';

// Global rate limit — 200 requests per 15 minutes per IP
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Terlalu banyak permintaan. Silakan coba lagi dalam 15 menit.',
    error: 'RATE_LIMIT_EXCEEDED',
  },
});

// Strict rate limiter for auth endpoints (login/register) — 10 attempts per 15 min
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Terlalu banyak percobaan login. Silakan coba lagi nanti.',
    error: 'AUTH_RATE_LIMIT_EXCEEDED',
  },
});

// Strict rate limiter for admin actions — 100 per 15 min
export const adminRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Terlalu banyak permintaan admin. Silakan coba lagi nanti.',
    error: 'ADMIN_RATE_LIMIT_EXCEEDED',
  },
});

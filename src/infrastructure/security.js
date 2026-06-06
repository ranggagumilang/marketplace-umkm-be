import helmet from 'helmet';

/**
 * Security middleware configuration
 * - Helmet: sets secure HTTP headers
 * - Content Security Policy tailored for Cloudinary & Google Fonts
 */
export const securityMiddleware = helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow images from Cloudinary
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'res.cloudinary.com', 'placehold.co', 'data:', 'blob:'],
      fontSrc: ["'self'", 'fonts.googleapis.com', 'fonts.gstatic.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", process.env.CLIENT_URL || 'http://localhost:5173'],
      frameAncestors: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
});

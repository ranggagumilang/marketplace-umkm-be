export const errorHandler = (err, req, res, next) => {
  // Log full error server-side in all environments
  console.error('[ERROR]', err);

  // Prisma Error Handling
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'Data sudah ada (Unique Constraint Failed)',
      error: 'CONFLICT'
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Data tidak ditemukan',
      error: 'NOT_FOUND'
    });
  }

  // Foreign Key Constraint Error (Prisma P2003 / Postgres RESTRICT)
  if (
    err.code === 'P2003' ||
    (err.message && (err.message.includes('foreign key constraint') || err.message.includes('violates RESTRICT setting')))
  ) {
    return res.status(400).json({
      success: false,
      message: 'Data tidak dapat dihapus karena masih memiliki relasi aktif dengan data lain.',
      error: 'FOREIGN_KEY_CONSTRAINT_VIOLATION'
    });
  }

  // JWT Error
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Sesi tidak valid atau telah berakhir',
      error: 'UNAUTHORIZED'
    });
  }

  // Multer / Upload Error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'Ukuran file terlalu besar. Maksimal 2MB.',
      error: 'FILE_TOO_LARGE'
    });
  }

  if (err.message && err.message.includes('Format file tidak didukung')) {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: 'INVALID_FILE_FORMAT'
    });
  }

  // Custom Error (from throw { statusCode, message })
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.errorCode || 'ERROR'
    });
  }

  // Default — don't leak internals in production
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Terjadi kesalahan internal server'
      : err.message || 'Terjadi kesalahan internal server',
    error: 'INTERNAL_SERVER_ERROR'
  });
};

export const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Akses ditolak. Hanya untuk Admin.', error: 'FORBIDDEN' });
  }
  next();
};

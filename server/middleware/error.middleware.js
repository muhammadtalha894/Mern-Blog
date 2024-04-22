export const errorMiddleWare = (err, req, res, next) => {
  const message = err.message || 'Internal server error';
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ success: false, message });
};

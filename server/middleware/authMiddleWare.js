import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler.js';

export const authMiddleWare = async (req, res, next) => {
  const token = req.cookies.access_blog_token;

  if (!token) return next(new ErrorHandler('Unauthorized', 401));

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(new ErrorHandler('Unauthorized', 401));
    }
    req.user = user;

    next();
  });
};

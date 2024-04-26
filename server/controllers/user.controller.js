import User from '../models/user.model.js';
import ErrorHandler from '../utils/errorHandler.js';
import bcrypt from 'bcryptjs';

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(new ErrorHandler('You are not allowed to update this user!'));
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        new ErrorHandler('Username must be between 7 and 20 characters', 400),
      );
    }
    if (req.body.username.includes(' ')) {
      return next(new ErrorHandler('Username cannot contain spaces', 400));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(new ErrorHandler('Username must be lowercase', 400));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        new ErrorHandler('Username can only contain letters and numbers', 400),
      );
    }
  }
  try {
    if (req.body.password) {
      if (req.body.password.length < 6)
        return next(new ErrorHandler('Password must be alteast 6 characters!'));
      req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10),
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          photo: req.body.photo,
        },
      },
      { new: true },
    );
    const { password, ...user } = updatedUser._doc;

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return next(
      new ErrorHandler('You are not allowed to delete this user!', 400),
    );

  await User.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .clearCookie('access_blog_token')
    .json('User has been deleted');
};

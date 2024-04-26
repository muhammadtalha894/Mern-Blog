import cookieParser from 'cookie-parser';
import User from '../models/user.model.js';
import ErrorHandler from '../utils/errorHandler.js';
import { jwtToken } from '../utils/jwtToken.js';

// user Signup Api

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username == '' ||
    email == '' ||
    password == ''
  )
    return next(new ErrorHandler('All feilds are required!'));

  try {
    const newUser = await User.create({ username, email, password });

    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

// user Sign in Api

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!password || !email || password == '' || email == '')
      return next(new ErrorHandler('All fields are required!', 400));

    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler('user not found!', 404));

    const checkPassword = await user.comparePassword(password);

    if (!checkPassword)
      return next(new ErrorHandler('Invalid Credential', 400));

    jwtToken(res, user);
  } catch (error) {
    next(error);
  }
};

// Google Sign in Api

export const Google = async (req, res, next) => {
  const { username, email, photo } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      jwtToken(res, user);
    } else {
      const password =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const newUser = new User({
        username:
          username.toLowerCase().split(' ').join('') +
          Math.random().toString().slice(-8),
        email,
        password,
        photo,
      });
      await newUser.save();
      jwtToken(res, newUser);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    res
      .clearCookie('access_blog_token')
      .status(200)
      .json({ success: true, message: 'Successfully sign out' });
  } catch (error) {
    next(error);
  }
};

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
    console.log(error);
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

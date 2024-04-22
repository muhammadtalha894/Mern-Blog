import User from '../models/user.model.js';
import ErrorHandler from '../utils/errorHandler.js';

// user Signup Api

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    (!username || !email || !password || username == '',
    email == '',
    password == '')
  )
    return next(new ErrorHandler('All feilds are required!'));

  try {
    const newUser = await User.create({ username, email, password });

    res.status(201).json({ success: true, newUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

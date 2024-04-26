import Post from '../models/post.model.js';
import ErrorHandler from '../utils/errorHandler.js';

export const createPost = async (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return next(new ErrorHandler('Please provide all required fields!'));
  }

  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '-');
  try {
    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    const savedPost = await newPost.save();

    res.status(201).json({ success: true, savedPost });
  } catch (error) {
    next(error);
  }
};

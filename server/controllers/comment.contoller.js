import Comment from '../models/comment.model.js';
import ErrorHandler from '../utils/errorHandler.js';

export const createComment = async (req, res, next) => {
  const { content, userId, postId } = req.body;
  console.log(req.body);
  if (userId !== req.user.id)
    return next(
      new ErrorHandler('You are not allowed to create comment!', 403),
    );
  try {
    const newComment = new Comment({
      content,
      userId,
      postId,
    });

    await newComment.save();

    res.status(201).json({ success: true, newComment });
  } catch (error) {
    next(error);
  }
};

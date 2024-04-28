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

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({
        createdAt: -1,
      })
      .populate('userId', 'username photo');
    res.status(200).json({ success: true, comments });
  } catch (error) {
    next(error);
  }
};

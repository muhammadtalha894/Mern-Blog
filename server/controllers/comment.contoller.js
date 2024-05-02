import Comment from '../models/comment.model.js';
import ErrorHandler from '../utils/errorHandler.js';

export const createComment = async (req, res, next) => {
  const { content, userId, postId } = req.body;

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
      .populate('userId', 'username photo isAdmin');
    res.status(200).json({ success: true, comments });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { postUserId, commentId, commentUserId } = req.body;

  if (
    req.user.isAdmin ||
    req.user.id == postUserId ||
    req.user.id == commentUserId
  ) {
    try {
      await Comment.findByIdAndDelete(commentId);

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  } else {
    next(new ErrorHandler('You can delete your comments only', 403));
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) return next(new ErrorHandler('Comment not found', 404));

    const userIndex = comment.likes.indexOf(req.user.id);

    if (userIndex === -1) {
      comment.likes.push(req.user.id);
      comment.numOfLikes += 1;
    } else {
      comment.likes.splice(userIndex, 1);
      comment.numOfLikes -= 1;
    }

    await comment.save();

    res.status(200).json({ success: true, comment });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  const { content } = req.body;
  if (req.user.id !== req.params.userId)
    return next(new ErrorHandler('You can update your comments only!'));

  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        $set: { content },
      },
      { new: true },
    );

    res.status(200).json({ success: true, comment });
  } catch (error) {
    next(error);
  }
};

export const getAllComments = async (req, res, next) => {
  let limit = parseInt(req.query.limit) || 9;
  const startIndex = parseInt(req.query.startIndex) || 0;
  const comments = await Comment.find({
    ...(req.query.userId && { userId: req.query.userId }),
  })
    .limit(limit)
    .skip(startIndex);

  const totalComments = await Comment.countDocuments({
    ...(req.query.userId && { userId: req.query.userId }),
   });

  const now = new Date();

  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate(),
  );
  const lastMonthComments = await Comment.countDocuments({
    createdAt: { $gte: oneMonthAgo },
    ...(req.query.userId && { userId: req.query.userId }),
  });

  res
    .status(200)
    .json({ success: true, comments, totalComments, lastMonthComments });
};

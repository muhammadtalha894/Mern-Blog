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

export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.params.order === 'asc' ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.PostId && { _id: req.query.postId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .limit(limit)
      .skip(startIndex);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ success: true, posts, totalPosts, lastMonthPosts });
  } catch (error) {
    next(error);
  }
};

export const userPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ userId: req.user.id });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    next(error);
  }
};
export const deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
export const getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ success: true, post });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new ErrorHandler('Post not found!'));

    const slug = req.body.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-');

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, slug },
      { new: true },
    );

    // const updatedPost = await updatePost.save();
    res.status(200).json({ success: true, updatedPost });
  } catch (error) {
    next(error);
  }
};

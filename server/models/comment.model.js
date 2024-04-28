import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    numOfLikes: {
      type: Number,
      default: 0,
    },
    numOfComments: {
      type: Number,
      defualt: 0,
    },
  },
  { timestamps: true },
);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;

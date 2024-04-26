import mongoose, { Schema } from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD9vD8FA01ESWdXO9RC6YIcqoTNq6zu3ra8bbQd70zcA&s',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model('Post', postSchema);

export default Post;

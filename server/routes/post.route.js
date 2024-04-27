import express from 'express';
import { authMiddleWare } from '../middleware/authMiddleWare.js';
import {
  createPost,
  getPosts,
  userPosts,
  deletePost,
  getSinglePost,
  updatePost,
} from '../controllers/post.contoller.js';

const postRoute = express.Router();

postRoute.post('/create', authMiddleWare, createPost);
postRoute.get('/getposts', getPosts);
postRoute.get('/getuserposts', authMiddleWare, userPosts);
postRoute.get('/delete/:id', authMiddleWare, deletePost);
postRoute.get('/singlepost/:id', getSinglePost);
postRoute.post('/update/:id', authMiddleWare, updatePost);

export default postRoute;

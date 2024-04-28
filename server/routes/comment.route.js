import express from 'express';
import { authMiddleWare } from '../middleware/authMiddleWare.js';
import {
  createComment,
  getPostComments,
} from '../controllers/comment.contoller.js';

const commentRoute = express.Router();

commentRoute.post('/create', authMiddleWare, createComment);
commentRoute.get('/getpostcomments/:postId', getPostComments);

export default commentRoute;

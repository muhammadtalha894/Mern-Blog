import express from 'express';
import { authMiddleWare } from '../middleware/authMiddleWare.js';
import {
  createComment,
  getPostComments,
  deleteComment,
  updateComment,
  likeComment,
  getAllComments,
} from '../controllers/comment.contoller.js';

const commentRoute = express.Router();

commentRoute.post('/create', authMiddleWare, createComment);
commentRoute.get('/getpostcomments/:postId', getPostComments);
commentRoute.delete('/delete', authMiddleWare, deleteComment);
commentRoute.get('/likecomment/:commentId', authMiddleWare, likeComment);
commentRoute.put('/update/:commentId/:userId', authMiddleWare, updateComment);
commentRoute.get('/getallcomments', authMiddleWare, getAllComments);

export default commentRoute;

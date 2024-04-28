import express from 'express';
import { authMiddleWare } from '../middleware/authMiddleWare.js';
import { createComment } from '../controllers/comment.contoller.js';

const commentRoute = express.Router();

commentRoute.post('/create', authMiddleWare, createComment);

export default commentRoute;

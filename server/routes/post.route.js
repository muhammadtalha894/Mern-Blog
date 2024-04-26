import express from 'express';
import { authMiddleWare } from '../middleware/authMiddleWare.js';
import { createPost } from '../controllers/post.contoller.js';

const postRoute = express.Router();

postRoute.post('/create', authMiddleWare, createPost);

export default postRoute;

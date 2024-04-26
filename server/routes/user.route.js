import express from 'express';
import { updateUser, deleteUser } from '../controllers/user.controller.js';
import { authMiddleWare } from '../middleware/authMiddleWare.js';

const userRoute = express.Router();

userRoute.put('/update/:id', authMiddleWare, updateUser);
userRoute.get('/delete/:id', authMiddleWare, deleteUser);
export default userRoute;

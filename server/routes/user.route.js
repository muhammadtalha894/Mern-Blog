import express from 'express';
import {
  updateUser,
  deleteUser,
  getAllUserAdmin,
  deleteAdminUser,
} from '../controllers/user.controller.js';
import { authMiddleWare } from '../middleware/authMiddleWare.js';

const userRoute = express.Router();

userRoute.put('/update/:id', authMiddleWare, updateUser);
userRoute.get('/delete/:id', authMiddleWare, deleteUser);
userRoute.get('/users', authMiddleWare, getAllUserAdmin);
userRoute.get('/deleteAdmin/:id', authMiddleWare, deleteAdminUser);
export default userRoute;

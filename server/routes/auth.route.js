import express from 'express';
import {
  signUp,
  signIn,
  Google,
  signOut,
} from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', signUp);

authRouter.post('/signin', signIn);

authRouter.post('/google', Google);
authRouter.get('/signout', signOut);

export default authRouter;

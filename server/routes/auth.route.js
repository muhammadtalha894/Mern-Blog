import express from 'express';
import { signUp, signIn ,Google} from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', signUp);

authRouter.post('/signin', signIn);

authRouter.post('/google', Google);

export default authRouter;

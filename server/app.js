import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleWare } from './middleware/error.middleware.js';

dotenv.config({
  path: 'server/utils/config.env',
});

const app = express();

export default app;

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.use(cookieParser());
app.use(
  express.json({
    limit: '50mb',
    extended: true,
  }),
);
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
  }),
);

app.use('/api/v1/auth', authRouter);
app.use(errorMiddleWare);

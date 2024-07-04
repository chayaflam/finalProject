import express from 'express';
import cors from "cors";
import { userRouter } from './router/userRouter.js';
import { authRouter } from './router/authRouter.js';
import { authMiddleWare } from './middleWare/authMiddleWare.js';
import { logErrors } from './middleWare/logError.js';
import { childrenRouter } from './router/childrenRouter.js';
import { classRouter } from './router/classRouter.js';
import cookieParser from 'cookie-parser';
import { messagesRouter } from './Router/messagesRouter.js';

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use(authMiddleWare);
app.use('/user', userRouter);
app.use('/child', childrenRouter);
app.use('/class', classRouter);
app.use('/messages', messagesRouter);
app.use(logErrors);

const port = process.env.PORT

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log("Server listening on PORT", port);
});








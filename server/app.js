import express from 'express';
import cors from "cors";
import { userRouter } from './Router/userRouter.js';
import { authRouter } from './Router/authRouter.js';
import { authMiddleWare } from './MiddleWare/authMiddleWare.js';
import { logErrors } from './MiddleWare/logError.js';
import { childrenRouter } from './Router/childrenRouter.js';

const app = express();
app.use(cors())

app.use(express.json());
app.use('/auth', authRouter)

app.use('/user', userRouter);
app.use('/child', childrenRouter);
app.use(authMiddleWare);
app.use(logErrors);

const port = process.env.PORT || 8080

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log("Server listening on PORT", port);
});








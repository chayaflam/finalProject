import express from 'express';
import cors from "cors";
import { userRouter } from './Router/userRouter.js';
import { authRouter } from './Router/authRouter.js';
import {authMiddleWare} from './MiddleWare/authMiddleWare.js';
import { logErrors } from './MiddleWare/logError.js';

const app = express();

app.use(cors())
app.use(express.json());
app.use('/auth', authRouter)
app.use(authMiddleWare);
app.use('/user', userRouter);
app.use(logErrors);

app.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});
import express from 'express';
import cors from "cors";
import { userRouter } from './Router/userRouter.js'
import { authRouter } from './Router/authRouter.js';

const app = express();
app.use(cors())
app.use(express.json());
app.use('/user', userRouter);
app.use('/auth', authRouter)

app.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});
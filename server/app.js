import express from 'express';
import cors from "cors";
//import createServer from 'createServer'
import { userRouter } from './Router/userRouter.js';
import { authRouter } from './Router/authRouter.js';
import { authMiddleWare } from './MiddleWare/authMiddleWare.js';
import { logErrors } from './MiddleWare/logError.js';
//import { Server } from 'socket.io';
import {chatMessageRouter} from './Router/chatMessageRouter.js'

const app = express();


// const server = createServer(app);
// const io = new Server(server, {
//     connectionStateRecovery: {},
//     adapter: createAdapter()
//   });

app.use(cors())
app.use(express.json());

app.on("connection",chatMessageRouter);
app.use('/auth', authRouter)
app.use(authMiddleWare);
app.use('/user', userRouter);

app.use(logErrors);
const port= process.env.PORT||8080
app.listen(port, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT",port);
});



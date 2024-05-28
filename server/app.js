import express from 'express';
import cors from "cors";
//import createServer from 'createServer'
import { userRouter } from './Router/userRouter.js';
import { authRouter } from './Router/authRouter.js';
import { authMiddleWare } from './MiddleWare/authMiddleWare.js';
import { logErrors } from './MiddleWare/logError.js';
import { io } from "socket.io-client";

const socket = io();

export default socket;

const app = express();
io.on("connection", (socket) => {
    console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
  });
// io.listen(process.env.PORT||5000);
// io.on('connection', function(socket) {
//     console.log('client connected');

//     // listen for incoming data msg on this newly connected socket
//     socket.on('data',function (data) {
//         console.log(`data received is '${data}'`)
//     });

// });
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






import express from 'express';
import cors from "cors";

//import createServer from 'createServer'
import { userRouter } from './Router/userRouter.js';
import { authRouter } from './Router/authRouter.js';
import { authMiddleWare } from './MiddleWare/authMiddleWare.js';
import { logErrors } from './MiddleWare/logError.js';
import { createServer } from "http";
import { Server } from "socket.io";
import { chatMessageRouter } from './Router/chatMessageRouter.js';
import { Socket } from 'socket.io-client';
import {ChatMessageController} from './Controller/chatMessageController.js'

const app = express();
app.use(cors())
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket)=>{
  socket.on('chat message', async (msg, clientOffset, callback) => {
   
  });
});

app.use(express.json());


app.use('/auth', authRouter)
app.use(authMiddleWare);
app.use('/user', userRouter);

app.use(logErrors);
const port = process.env.PORT||8080
app.listen(port, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT",port);
});

httpServer.listen(4000, (err) => {
  if (err) console.error(err);
  console.log("Server listening on PORT", 4000);
});






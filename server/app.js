import express from 'express';
import cors from "cors";

//import createServer from 'createServer'
import { userRouter } from './Router/userRouter.js';
import { authRouter } from './Router/authRouter.js';
import { authMiddleWare } from './MiddleWare/authMiddleWare.js';
import { logErrors } from './MiddleWare/logError.js';
import { createServer } from "http";
import { Server } from "socket.io";
import { Socket } from 'socket.io-client';
import { ChatMessageController } from './Controller/chatMessageController.js'
import { childrenRouter } from './Router/childrenRouter.js';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on('chat message', async (msg, clientOffset, callback) => {
    console.log("😊😊😊 " + msg);
    let result
    try {
      console.log("🎄")
      // api
     let chatMessageController = new ChatMessageController();
     result = await chatMessageController.test({});
      console.log("😊😊😊😊😊😊😊" + result)
     
    } catch (e) {
      if (e.errno === 19 /* SQLITE_CONSTRAINT */) {
        callback();
      } else {
        // nothing to do, just let the client retry
      }
      return;
    }
    io.emit('chat message', msg, result.babyId);
    callback();
  });
});

httpServer.listen(4000, (err) => {
  if (err) console.error(err);
  console.log("Server listening on PORT", 4000);
});


const app = express();
app.use(cors())

app.use(express.json());
app.use('/auth', authRouter)
app.use(authMiddleWare);
app.use('/user', userRouter);
app.use('/child', childrenRouter);
app.use(logErrors);


const port = process.env.PORT || 8080

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log("Server listening on PORT", port);
});








import { createServer } from "http";
import { Server } from "socket.io";
import { ChatMessageController } from './Controller/chatMessageController.js'
import { executeQuery } from "./Service/dataBase.js";
import { postQuery } from "./Service/queries.js";



const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on('chat message', async (msg, clientOffset, callback) => {
        let result;
        try {
            let date= new Date()
            console.log(date+"🙌🙌🙌🙌")
            const queryChildren = postQuery("messages");
             result = await executeQuery(queryChildren, [12,msg,date]);
            // result = await executeQuery('INSERT INTO finalprojectdb.messages (babyId, message, date) VALUES (?, ?, ?)', [12, data, NOW()]);
        } catch (e) {
            if (e.errno === 19 /* SQLITE_CONSTRAINT */) {
                callback();
            } else {
                // nothing to do, just let the client retry
            }
            return;
        }
        console.log(result)
        io.emit('chat message', msg, result);

        // callback();
    });
      
});

httpServer.listen(4000, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 4000);
});
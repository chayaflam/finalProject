import { createServer } from "http";
import { Server } from "socket.io";
import { executeQuery } from "./Service/dataBase.js";
import { postQuery } from "./Service/queries.js";
import { ChatMessageController } from "./Controller/chatMessageController.js";


const url = process.env.CLIENT_URL || 'http://localhost:5173'
const httpServer = createServer();
export const io = new Server(httpServer, {
    cors: {
        origin: url,
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    let chatMessageController = new ChatMessageController
    let result
    socket.on('chat message', async (data, clientOffset, callback) => {
        try {
            console.log("🎍🎍🎄"+Object.values(data))
            let date = new Date()
            const queryChildren = postQuery("messages");
            result = await executeQuery(queryChildren, [data.babyId, data.msg, date]);

        } catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
        }
        console.log("🎍🎍🎄"+Object.keys(result))
     
           io.emit('chat message',data.msg,result)
    })


});

const port = process.env.PORT_SOCKET || 4000
httpServer.listen(4000, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 4000);
});
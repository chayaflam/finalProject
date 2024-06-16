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

//---------------------------------------------------------------------------------------------------------------------
let chatRoom = ''; // E.g. javascript, node,...
let allUsers = [];
let chatRoomUsers=[] ;// All users in current chat room
const CHAT_BOT = 'ChatBot';
//---------------------------------------------------------------------------------------------------------------------

io.on("connection", (socket) => {
    let chatMessageController = new ChatMessageController
    let result

    //------------------------------------------------------------------------------------------------------------------


    socket.on('join_room', (data) => {
        console.log("🎈🌺🌻🌼🌷🥀")
        const { username, room } = data; // Data sent from client when join_room event emitted
        socket.join(room);
        let createdtime= Date.now(); // Current timestamp
        // Send message to all users currently in the room, apart from the user that just joined
        socket.to(room).emit('receive_message', {
            message: `${username} has joined the chat room`,
            username: CHAT_BOT,
            createdtime,
        });
        chatRoom = room;
        console.log(room)
        allUsers.push({ id: socket.id, username, room });
        chatRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);
    });
    socket.on('send_message', async (data) => {

        try {
            const { message, username, room, createdtime } = data;
            console.log(room+"💜💙💚💛🧡")
            io.in(room).emit('receive_message', data); // Send to all users in room, including sender
            const queryChildren = postQuery("messages");
            result = await executeQuery(queryChildren, [username, room, message, createdtime]);
            //emit????
        } catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
        }
    });


    //-----------------------------------------------------------------------------------------------------------------

//     socket.on('chat message', async (data, clientOffset, callback) => {
//         try {
//             console.log("🎍🎍🎄" + Object.values(data))
//             let date = new Date()
//             const queryChildren = postQuery("messages");
//             result = await executeQuery(queryChildren, [data.babyId, data.msg, date]);

//         } catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//         }
//         console.log("🎍🎍🎄" + Object.keys(result))

//         io.emit('chat message', data.msg, result)
//     })


 });

const port = process.env.PORT_SOCKET || 4000
httpServer.listen(4000, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 4000);
});
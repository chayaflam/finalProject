import { createServer } from "http";
import { Server } from "socket.io";
import { executeQuery } from "./Service/dataBase.js";
import { postQuery, getByParamQuery, getTodayMessagesQuery } from "./Service/queries.js";
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
let chatRoom = '';
let allUsers = [];
let chatRoomUsers = [];
const CHAT_BOT = 'ChatBot';
//---------------------------------------------------------------------------------------------------------------------

io.on("connection", (socket) => {
    let chatMessageController = new ChatMessageController
    let result

    //------------------------------------------------------------------------------------------------------------------


    socket.on('join_room', async (data) => {
        console.log("🎈🌺🌻🌼🌷🥀")
        try {
            const { username, room } = data; // Data sent from client when join_room event emitted
            socket.join(room);
            const createdtime = Date.now(); // Current timestamp
            // Send message to all users currently in the room, apart from the user that just joined
            const dataQuary = getTodayMessagesQuery();
            result = await executeQuery(dataQuary, [room]);
            chatRoomUsers = allUsers.filter((user) => user.username === room);
            io.to(room).emit('receive_message',result)////////////////😊😙😚
            chatRoom = room;
            console.log(room)
            allUsers.push({ id: socket.id, username, room });
        } catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
        }
    });

    socket.on('send_message', async (data) => {
        try {
            const { message, username, room, createdtime } = data;
            console.log(room + "💜💙💚💛🧡")
            io.in(room).emit('receive_message', [data]); // Send to all users in room, including sender
            const queryChildren = postQuery("messages");
            result = await executeQuery(queryChildren, [username, room, message, createdtime]);
            //emit????
        } catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
        }

        socket.on('send_message_to_group', async (data) => {
            try {
                const { message, room, createdtime } = data;
                console.log(room + "💗💗💓💕")
                io.in(room).emit('receive_message', data);
                const queryClass = postQuery("messages");
                result = await executeQuery(queryClass, ["ruth", room, message, createdtime]);
            } catch (ex) {
                const err = {}
                err.statusCode = 500;
                err.message = ex;
            }

        });

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
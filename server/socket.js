import { createServer } from "http";
import { Server } from "socket.io";
import { executeQuery } from "./service/dataBase.js";
import { getTodayMessagesQuery, postQuery } from './service/queries/messagesQuery.js'
import { getByParamQuery } from "./service/queries/genericQuery.js";
const url = process.env.CLIENT_URL
const httpServer = createServer();

export const io = new Server(httpServer, {
    cors: {
        origin: url,
        methods: ["GET", "POST"]
    }
});

let childClass = [];
let result;

io.on("connection", (socket) => {

    socket.on('join_room', async (data) => {
        try {
            const { username, room } = data;
            socket.join(room);
            const dataQuary = getTodayMessagesQuery();
            result = await executeQuery(dataQuary, [room, room]);
            io.to(room).emit('receive_message', { data: result, isJoin: true })
        } catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
        }
    });

    socket.on('join_public_room', async (data) => {
        try {
            const { username, publicRoom } = data;
            socket.join(publicRoom);
            const dataQuary = getTodayMessagesQuery();
            result = await executeQuery(dataQuary, [publicRoom]);
            const classQuery = getByParamQuery('child', 'childrenClassId');
            childClass = await executeQuery(classQuery, [publicRoom]);
            childClass.map((child) => {
                socket.join(child.childId);
                io.to(child.childId).emit('receive_message', { data: result, isJoin: true })
            })
        } catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
        }
    });

    socket.on('send_message', async (data) => {
        try {
            const { username, room, msg, createdtime } = data;
            const newData = { senderName: username, message: msg, date: createdtime }
            io.in(room).emit('receive_message', { data: [newData], isJoin: false });
            const queryChildren = postQuery();
            result = await executeQuery(queryChildren, [username, room, msg, createdtime]);
        } catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
        }
    });

    socket.on('send_message_to_class', async (data) => {
        try {
            const { username, room, msg, createdtime } = data;
            const newData = { senderName: "all class", message: msg, date: createdtime }
            const classQuery = getByParamQuery('child', 'childrenClassId');
            childClass = await executeQuery(classQuery, [room]);
           
            childClass.map(child => {
                let privateRooom = child.childId
                io.to(privateRooom).emit('receive_message', { data: [newData], isJoin: false });
            })
            const queryChildren = postQuery();
            result = await executeQuery(queryChildren, [username, room, msg, createdtime]);
        } catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
        }
    });
});

const port = process.env.PORT_SOCKET
httpServer.listen(port, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", port);
});
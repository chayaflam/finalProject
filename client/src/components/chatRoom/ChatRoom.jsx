import { socket } from '../../socket.js';
import React, { useState, useEffect, useContext } from 'react';
import { BabyContext, UserContext } from "../../main";
import diaper from '../../../public/img/diaper.png'
import sleep from '../../../public/img/sleep.png'
import './ChatRoom.css'

function ChatRoom() {
    const [user, setUser] = useContext(UserContext)
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([]);
    const [baby, setBaby] = useContext(BabyContext)
    const enable = user.status == "teacher" ? true : false;
    let counter = 0;

    // Send a message
    const sendMessage = (message) => {
        console.log(message)
        if (message) {
            const clientOffset = `${socket.id}-${counter++}`;
            console.log(`${socket.id}-${counter++}`)
            socket.emit('chat message', message, clientOffset);
            setMessages(messages => [...messages, message.msg]);
        }
    };

    // Receive messages
    useEffect(() => {
        console.log("reserve")
        socket.on('chat message', (message, serverOffset) => {
            setMessages(messages => [...messages, message]);
            // socket.auth.serverOffset = serverOffset;
            console.log(messages)
        });
    }, [user]);

    return (
        <>
            <div className="chat-room">
                <h1>The chat room components will go here</h1>
                {enable && <button onClick={() => sendMessage({ babyId: baby.childId, msg: "diaper" })}><img src={diaper} /></button>}
                {enable && <button onClick={() => sendMessage({ babyId: baby.childId, msg: "sleep" })}><img src={sleep} /></button>}
                {messages.length && <ul>{messages.map(element => {
                    return (<li>
                        {element}
                    </li>)
                })}
                </ul>}
            </div>

        </>

    );
}

export default ChatRoom;
// socket.on('chat message', (msg, serverOffset) => {
//     socket.auth.serverOffset = serverOffset;

// })

// socket.open(err => {
//     if (err)
//         console.log("errr")
//     else
//         console.log("🛹🛹🛹🛹🛹🛹")
// })

// const socket = io(URL,{

//     headers: {
//         authorization:
//             user.token
//     },
//     ackTimeout: 10000,
//     retries: 3,
// });


// // Join a chat room
// const joinChatRoom = (userDetails) => {
//     setUser(userDetails);
//     socket.emit('join', userDetails);
// };

// // Leave a chat room
// const leaveChatRoom = () => {
//     socket.emit('leave', user);
//     setUser(null);
// };

// socket = io({
//     autoConnect: false
//   });

//   socket.connect();
// const babySocket = socket.socket("/Jinny");
// // useEffect(() => {
//     localStorage.setItem('messages', JSON.stringify(messages));
// }, [messages]);
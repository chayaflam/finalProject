import { socket } from '../../socket.js';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../main";
import diaper from '../../img/diaper.png'
import './ChatRoom.css'

function ChatRoom() {
    const [user, setUser] = useContext(UserContext)
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([]);

    

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

    let counter = 0;
    // socket = io({
    //     autoConnect: false
    //   });

    //   socket.connect();
    // const babySocket = socket.socket("/Jinny");
    // // useEffect(() => {
    //     localStorage.setItem('messages', JSON.stringify(messages));
    // }, [messages]);


    // Send a message
    const sendMessage = (message) => {
        // message.preventDefault();
        console.log(message)
        if (message) {
            const clientOffset = `${socket.id}-${counter++}`;
            console.log(`${socket.id}-${counter++}`)
            socket.emit('chat message', message, clientOffset);
            setMessages(messages => [...messages, message]);
        }
    };

    // socket.on('chat message', (msg, serverOffset) => {
    //     socket.auth.serverOffset = serverOffset;

    // })




    //--------------------------

    // Receive messages
    useEffect(() => {
        console.log("reserve")
        socket.on('chat message', (message, serverOffset) => {
            setMessages(messages => [...messages, message]);
           // socket.auth.serverOffset = serverOffset;
            console.log(messages)
        });
    }, [user]);

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

    return (
        <>
            <div className="chat-room">
                <h1>The chat room components will go here</h1>
                <button onClick={() => sendMessage("diaper")}><img src={diaper}/></button>
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

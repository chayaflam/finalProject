import { socket } from '../../socket.js';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../main";






function ChatRoom() {
    const [user, setUser] = useContext(UserContext)
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState(
        JSON.parse(localStorage.getItem('messages')) || []
    );
    
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
        //message.preventDefault();
        console.log(message)
        if (message) {
            const clientOffset = `${socket.id}-${counter++}`;
            console.log( `${socket.id}-${counter++}`)
            socket.emit('chat message', message, clientOffset);
            setMessages(messages => [...messages, message]);
        }

    };

    socket.on('chat message', (msg, serverOffset) => {
        socket.auth.serverOffset = serverOffset;
    })



    //--------------------------

    // Receive messages
    // useEffect(() => {
    //     socket.on('message', (message) => {
    //         setMessages(messages => [...messages, message]);
    //     });
    // }, []);

    // Join a chat room
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
            {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.5/socket.io.js" integrity="sha512-luMnTJZ7oEchNDZAtQhgjomP1eZefnl82ruTH/3Oj/Yu5qYtwL7+dVRccACS/Snp1lFXq188XFipHKYE75IaQQ==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script> */}
            <div className="chat-room">
                <h1>The chat room components will go here</h1>
                <button onClick={() => sendMessage("diaper")}>hiiii
                </button>
                {messages && <ul>{messages.forEach(element => {
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

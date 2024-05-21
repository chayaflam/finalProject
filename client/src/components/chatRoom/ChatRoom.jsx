import { io } from "socket.io-client";
import React, { useState, useEffect } from 'react';
const socket = io('http://localhost:8080');



function ChatRoom() {
    const [user, setUser] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState(
        JSON.parse(localStorage.getItem('messages')) || []
      );
    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    // Send a message
    const sendMessage = () => {
        socket.emit('message', messageText);
        setMessageText('');
    };

    // Receive messages
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]);
        });
    }, []);
    // Join a chat room
    const joinChatRoom = (userDetails) => {
        setUser(userDetails);
        socket.emit('join', userDetails);
    };

    // Leave a chat room
    const leaveChatRoom = () => {
        socket.emit('leave', user);
        setUser(null);
    };
    return (
        <div className="chat-room">
      <h1>The chat room components will go here</h1>
        </div>
    );
}

export default ChatRoom;

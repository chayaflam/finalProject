
import React, { useState, useEffect, useContext } from 'react';
import {  UserContext } from "../../main";

const SendMessage = ({ socket, username, room }) => {

  const [message, setMessage] = useState('');
  const sendMessage = () => {
    if (message !== '') {
      const createdtime= new Date().toISOString().slice(0, 19).replace('T', ' ')

  
       
    
     
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit('send_message', { username, room, message,createdtime });
      setMessage('');
    }
  };

  return (
    <div >
      <input
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className='btn btn-primary' onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;
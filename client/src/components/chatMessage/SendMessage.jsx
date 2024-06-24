
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../main";

const SendMessage = ({ socket, username, room }) => {


  const [user, setUser] = useContext(UserContext);
  const [message, setMessage] = useState('');


  const sendMessage = () => {
    if (message !== '') {
      const createdtime = new Date().toISOString().slice(0, 19).replace('T', ' ')
      console.log(room)
      console.log(createdtime)
      socket.emit('send_message', { username, room, message, createdtime });
      setMessage('');
    }
  };

  return (
    <div >
      <input placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message} />
      <button className='btn btn-primary' onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;
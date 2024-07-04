import React from 'react';
import { useState, useEffect } from 'react';

function ChatMessage({ socket, username, room }) {

  const [messagesRecieved, setMessagesReceived] = useState([]);

  useEffect(() => {
    socket.emit('join_room', { username, room });
  }, []);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      data.isJoin && setMessagesReceived([]);
      data.data.map(msg => {
        setMessagesReceived((state) => [
          ...state, {
            message: msg.message,
            senderName: msg.senderName,
            createdtime: msg.date,
          }
        ]);
      })
    });
    return () => socket.off('receive_message');
  }, [socket]);

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div >
      {messagesRecieved.map((msg, i) => (
        <div key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span >{msg.senderName}</span>
            <span >
              {formatDateFromTimestamp(msg.createdtime)}
            </span>
          </div>
          <p >{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default ChatMessage;
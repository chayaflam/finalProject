import React from 'react';
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


function ChatMessage({ socket, username, room }) {
  const [messagesRecieved, setMessagesReceived] = useState([]);


  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      data.length > 1 && setMessagesReceived([]);
      data.map(msg => {
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

  useEffect(() => {
    socket.emit('join_room', { username, room });
    setMessagesReceived([]);
  }, []);

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
  console.log(messagesRecieved)
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
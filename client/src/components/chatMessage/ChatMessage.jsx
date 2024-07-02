import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UserContext } from '../../main';
import diaper from '../../../public/img/diaper.png'
import sleep from '../../../public/img/sleep.png'
import food from '../../../public/img/food.png'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';

import VolumeUp from '@mui/icons-material/VolumeUp';
function ChatMessage({ socket, username, room }) {
  const [user, setUser] = useContext(UserContext)
  const [messagesRecieved, setMessagesReceived] = useState([]);

  useEffect(() => {
    socket.emit('join_room', { username, room });

    
  }, []);
 
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data.data);
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
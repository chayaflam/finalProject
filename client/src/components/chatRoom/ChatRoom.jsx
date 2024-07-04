import { socket } from '../../socket.js';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { UserContext } from "../../main";

import diaper from '../../../public/img/diaper.png'
import sleep from '../../../public/img/sleep.png'
import food from '../../../public/img/food.png'
import './ChatRoom.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';
import ChatMessage from '../chatMessage/ChatMessage.jsx';
import SendMessage from '../chatMessage/SendMessage.jsx';


const Input = styled(MuiInput)`
  width: 42px;
`;

function ChatRoom(props) {
    const [user, setUser] = useContext(UserContext)
    return (
        <div className='chatDiv'>
            <div className='chatMessages'>
                <ChatMessage socket={socket} username={user.username} room={props.addressee} />
            </div>
            <div className='centeredSendMessage'>
                <SendMessage socket={socket} username={user.username} room={props.addressee} isPublicRoom={props.isPublicRoom} />
            </div>
        </div>
    );

}

export default ChatRoom;

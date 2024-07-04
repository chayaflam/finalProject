import { socket } from '../../socket.js';
import React, {  useContext } from 'react';
import { UserContext } from "../../main";
import './ChatRoom.css';
import ChatMessage from '../chatMessage/ChatMessage.jsx';
import SendMessage from '../chatMessage/SendMessage.jsx';

function ChatRoom(props) {

    const [user, setUser] = useContext(UserContext);

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

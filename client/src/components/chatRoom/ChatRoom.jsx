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
    // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
    console.log(props)
    return (
        <div >
            <div>
                <SendMessage socket={socket} username={user.username} room={props.addressee} isPublicRoom={props.isPublicRoom}/>
                <ChatMessage socket={socket} username={user.username} room={props.addressee} />
            </div>
        </div>
    );





    // const [user, setUser] = useContext(UserContext)
    // const [messageText, setMessageText] = useState('');
    // const [messages, setMessages] = useState([]);
    // const [baby, setBaby] = useContext(BabyContext)
    // const enable = user.status == "teacher" ? true : false;
    // let counter = 0;


    // const [value, setValue] = React.useState(0);

    // const handleSliderChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    // const handleInputChange = (event) => {
    //     setValue(event.target.value === '' ? 0 : Number(event.target.value));
    // };

    // const handleBlur = () => {
    //     if (value < 0) {
    //         setValue(0);
    //     } else if (value > 250) {
    //         setValue(250);
    //     }
    // };

    // // Send a message
    // const sendMessage = (message) => {
    //     console.log(message)
    //     if (message) {
    //         const clientOffset = `${socket.id}-${counter++}`;
    //         console.log(`${socket.id}-${counter++}`)
    //         socket.emit('chat message', message, clientOffset);
    //         setMessages(messages => [...messages, message.msg]);
    //     }
    // };

    // // Receive messages
    // useEffect(() => {
    //     console.log("reserve")
    //     socket.on('chat message', (message, serverOffset) => {
    //         setMessages(messages => [...messages, message]);
    //         // socket.auth.serverOffset = serverOffset;
    //         console.log(messages)
    //     });
    // }, [user]);

    // return (
    //     <>
    //         <div className="chat-room">
    //             <h1>The chat room components will go here</h1>
    //             {enable && <button onClick={() => sendMessage({ babyId: baby.childId, msg: "diaper" })}><img src={diaper} /></button>}
    //             {enable && <button onClick={() => sendMessage({ babyId: baby.childId, msg: "sleep" })}><img src={sleep} /></button>}
    //             {enable && <button onClick={() => sendMessage({ babyId: baby.childId, msg: "sleep" })}><img src={sleep} /></button>}
    //             <Box sx={{ width: 250 }}>
    //                 <Typography id="input-slider" gutterBottom>
    //                     Volume
    //                 </Typography>
    //                 <Grid container spacing={2} alignItems="center">
    //                     <Grid item>
    //                         <img src={food}  />
    //                     </Grid>
    //                     <Grid item xs>
    //                         <Slider
    //                             value={typeof value === 'number' ? value : 0}
    //                             onChange={handleSliderChange}
    //                             max={250}
    //                             aria-labelledby="input-slider"
    //                         />
    //                     </Grid>
    //                     <Grid item>
    //                         <Input
    //                             value={value}
    //                             size="small"
    //                             onChange={handleInputChange}
    //                             onBlur={handleBlur}
    //                             inputProps={{
    //                                 step: 20,
    //                                 min: 0,
    //                                 max: 250,
    //                                 type: 'number',
    //                                 'aria-labelledby': 'input-slider',
    //                             }}
    //                         />
    //                     </Grid>
    //                 </Grid>
    //             </Box>

    //             {messages.length && <ul>{messages.map(element => {
    //                 return (<li>
    //                     {element}
    //                 </li>)
    //             })}
    //             </ul>}
    //         </div>

    //     </>

    // );
}

export default ChatRoom;
// socket.on('chat message', (msg, serverOffset) => {
//     socket.auth.serverOffset = serverOffset;

// })

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

// socket = io({
//     autoConnect: false
//   });

//   socket.connect();
// const babySocket = socket.socket("/Jinny");
// // useEffect(() => {
//     localStorage.setItem('messages', JSON.stringify(messages));
// }, [messages]);
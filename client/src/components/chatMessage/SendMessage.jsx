
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../main";
import diaper from '../../../public/img/diaper.png'
import sleep from '../../../public/img/sleep.png'
import food from '../../../public/img/food.png'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import { Tooltip } from 'primereact/tooltip';
import { Image } from 'primereact/image';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { InputText } from 'primereact/inputtext';
import "./SendMessages.css"
const SendMessage = ({ socket, username, room }) => {

  const imgUrl = '../../../public/img';
  const [user, setUser] = useContext(UserContext);
  const [message, setMessage] = useState('');
  const enable = user.status == "teacher" ? true : false;

  const sendMessage = () => {
    console.log(message)
    if (message !== '') {
      const createdtime = new Date().toISOString().slice(0, 19).replace('T', ' ')
      console.log(createdtime)
      socket.emit('send_message', { username, room, message, createdtime });
      setMessage('');
    }
  };


  const handleButtonClick = (imageSrc) => {
    setMessage(imageSrc);
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };


  return (
    <div >
      {/* <>
        <div className="chat-room">
          {enable && <button onClick={() => sendMessage({ babyId: baby.childId, msg: "diaper" })}><img src={diaper} /></button>}
          {enable && <button onClick={() => sendMessage({ babyId: baby.childId, msg: "sleep" })}><img src={sleep} /></button>}
          <Box sx={{ width: 250 }}>
            <Typography id="input-slider" gutterBottom />

            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <img src={food} />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof value === 'number' ? value : 0}
                  onChange={handleSliderChange}
                  max={250}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item>
                <Input
                  value={value}
                  size="small"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 20,
                    min: 0,
                    max: 250,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </div>

      </> */}

      {/* <Tooltip target=".tooltip-button" autoHide={false}>
        <div className="flex align-items-center">
          <Button type="button" className="p-button-rounded p-button-success ml-2"><img src={diaper}/></Button>
          <Button type="button"className="p-button-rounded p-button-danger ml-2"><img src={diaper}/></Button>
        </div>
      </Tooltip>
      <input className="tooltip-button" type="text"  /> */}
      <div className='sendMessage'>
        <Tooltip target=".tooltip-button" autoHide={false}>
          <div className="flex align-items-center">
            <Image src={diaper} className="daiper p-button-rounded p-button-success ml-2 " onClick={() => handleButtonClick("diaper")}>

            </Image>
            <Image src={sleep} className="sleep p-button-rounded p-button-danger ml-2 " onClick={() => handleButtonClick("sleep")}>

            </Image>
            <Image src={food} className="food p-button-rounded p-button-danger ml-2 " onClick={() => handleButtonClick("food")}>

            </Image>
          </div>
        </Tooltip>
        <InputText placeholder={"Send Messages"} className="tooltip-button" type="text" value={message} />
        <button className='btn btn-primary' onClick={sendMessage}>
        Send Message
      </button>
      </div>

      {/* <input placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message} />
      <button className='btn btn-primary' onClick={sendMessage}>
        Send Message
      </button> */}
    </div>
  );
};

export default SendMessage;







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

import VolumeUp from '@mui/icons-material/VolumeUp';
const SendMessage = ({ socket, username, room }) => {


  const [user, setUser] = useContext(UserContext);
  const [message, setMessage] = useState('');
  const enable = user.status == "teacher" ? true : false;

  const sendMessage = () => {
    if (message !== '') {
      const createdtime = new Date().toISOString().slice(0, 19).replace('T', ' ')
      console.log(room)
      console.log(createdtime)
      socket.emit('send_message', { username, room, message, createdtime });
      setMessage('');
    }
  };

  const [value, setValue] = React.useState(0);

  const handleSliderChange = (event, newValue) => {
      setValue(newValue);
  };

  const handleInputChange = (event) => {
      setValue(event.target.value === '' ? 0 : Number(event.target.value));
  };
  const handleBlur = () => {
      if (value < 0) {
          setValue(0);
      } else if (value > 250) {
          setValue(250);
      }
  };

  return (
    <div >
                 <>
        <div className="chat-room">
          {enable && <button onClick={() => sendMessage({ babyId: baby.childId, msg: "diaper" })}><img src={diaper} /></button>}
          {enable && <button onClick={() => sendMessage({ babyId: baby.childId, msg: "sleep" })}><img src={sleep} /></button>}
          <Box sx={{ width: 250 }}>
            <Typography id="input-slider" gutterBottom/>
          
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

      </>
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
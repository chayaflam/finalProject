
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../main";
import diaper from '../../../public/img/diaper.png'
import sleep from '../../../public/img/sleep.png'
import food from '../../../public/img/food.png'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import VolumeUp from '@mui/icons-material/VolumeUp';
import "./SendMessages.css"
import { GiBabyBottle } from "react-icons/gi";
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { Dialog } from 'primereact/dialog';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box'
import { useParams } from "react-router-dom";

const SendMessage = ({ socket, username, room, isPublicRoom }) => {
  const imgUrl = '../../../public/img';
  const [user, setUser] = useContext(UserContext);
  const [message, setMessage] = useState('');
  const enable = user.status == "teacher" ? true : false;
  const { register, handleSubmit } = useForm()
  const [visible, setVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(30);
  let { babyname } = useParams();

  const sendMessage = (message) => {
    if (message !== '') {
      const createdtime = new Date().toISOString().slice(0, 19).replace('T', ' ')
      if (isPublicRoom) {
        console.log("isPublicRoom")
        socket.emit('send_message_to_class', { username, room, message, createdtime })

      }
      else
        socket.emit('send_message', { username, room, message, createdtime });
    }

  };


  const footerContent = (
    <div>
      <Button
        label="Send"
        icon="pi pi-send"
        onClick={() => {
          setVisible(false);
          sendMessage(`food-${sliderValue}cc`)
        }}
        className="p-button-text"
      />

    </div>
  );

  return (
    <div >

      <div className='sendMessage'>
        <Dialog header={`how much ${babyname} ate?`} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Slider
              sx={{ width: 380, marginRight: 2 }}
              aria-label="Volume"
              defaultValue={30}
              max={360}
              valueLabelDisplay='auto'
              value={sliderValue}
              onChange={(e,value) => setSliderValue(value)}
            />
            <img src={food} className='iconBottle' />
          </Box>
          {footerContent}
        </Dialog>
        <button className="imageButtom sleep" onClick={() => sendMessage("sleep")}></button>
        <button className="imageButtom diaper" onClick={() => sendMessage("daiper")}></button>
        <button className="imageButtom food" onClick={() => setVisible(true)}></button>

        <form onSubmit={handleSubmit(sendMessage)}>
          <InputText type="text" name="message" id="message" {...register("message")} />
          <button className='btn btn-primary' type='submit'>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};


export default SendMessage;


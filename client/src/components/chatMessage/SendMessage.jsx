import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../main";
import food from '../../../public/img/food.png'
import "./SendMessages.css"
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box'
import { useParams } from "react-router-dom";

const SendMessage = ({ socket, username, room, isPublicRoom }) => {
  const { register, handleSubmit } = useForm()
  const [user, setUser] = useContext(UserContext)
  const [visible, setVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(30);
  let { childname } = useParams();

  const sendMessage = (data) => {
    let msg=data.message
    if (msg !== '') {
      const createdtime = new Date().toISOString().slice(0, 19).replace('T', ' ')
      isPublicRoom ? socket.emit('send_message_to_class', { username, room, msg, createdtime }) :
        socket.emit('send_message', { username, room,msg, createdtime });
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
        {user.status == "teacher" && <div>
          <Dialog header={`how much ${childname} ate?`} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Slider
                sx={{ width: 380, marginRight: 2 }}
                aria-label="Volume"
                defaultValue={30}
                max={360}
                valueLabelDisplay='auto'
                value={sliderValue}
                onChange={(e, value) => setSliderValue(value)} />
              <img src={food} className='iconBottle' />
            </Box>
            {footerContent}
          </Dialog>
          <button className="imageButtom sleep" onClick={() => sendMessage({message:"sleep"})}></button>
          <button className="imageButtom diaper" onClick={() => sendMessage({message:"daiper"})}></button>
          <button className="imageButtom food" onClick={() => setVisible(true)}></button>   </div>}
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


import React, { useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import ChatRoom from "../chatRoom/ChatRoom";


export default function Baby() {
    const URL = "http://localhost:8080"
   
 

    return (<>
        <h1>baby!!!</h1>
        <ChatRoom/>
    </>)
};
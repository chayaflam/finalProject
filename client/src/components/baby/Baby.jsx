import React, { useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import ChatRoom from "../chatRoom/ChatRoom";
import { useLocation } from "react-router-dom";

export default function Baby() {
    const URL = "http://localhost:8080"
    const location =useLocation()
    return (<>
        <h1>baby!!!</h1>
        <ChatRoom baby={location.state.baby}/>
    </>)
};
import React, { useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import ChatRoom from "../chatRoom/ChatRoom";
import { useLocation, useParams } from "react-router-dom";
const imgUrl = '../../../public/img'

export default function Baby() {
    const URL = "http://localhost:8080"
    const location = useLocation();
    let { babyname } = useParams();
    console.log(babyname)
    return (<>
        <h1>baby!!!</h1>
        <img src={`${imgUrl}/${babyname}.png `} alt={babyname} />
        <ChatRoom addressee={location.state.addressee} />
    </>)
};
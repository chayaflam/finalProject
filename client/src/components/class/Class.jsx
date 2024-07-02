import React, { useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import ChatRoom from "../chatRoom/ChatRoom";
import { useLocation } from "react-router-dom";
import './class.css'
import Teacher from "../teacher/Teacher";

export default function Class() {
    const URL = "http://localhost:8080"
    const location = useLocation()
    return (<>


        <div className="container">
            <div className="teacher">
                <Teacher />
            </div>
            <div className="class">
                <ChatRoom addressee={location.state.addressee} isPublicRoom={location.state.isPublicRoom} />
            </div>
        </div>
    </>)
};
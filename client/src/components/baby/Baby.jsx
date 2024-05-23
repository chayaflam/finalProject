import React, { useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import io from 'socket.io-client'

export default function Baby() {
    const URL = "http://localhost:8080"
    const { register, handleSubmit } = useForm();

    let socket = io.connect(`${URL}`, {
        reconnection: false
    });

    const teacherMessageHandleSubmit = (data) => {
        socket.on('connect', function() {
            console.log('Connected to server');
            socket.emit( 'data from client',data);
        });
    }

    return (<>
         <form onSubmit={handleSubmit(teacherMessageHandleSubmit)}>
         <label>message:<textarea type="text" name="teacherMessage" {...register("teacherMessage")} /></label><br />
        <input type="submit" value="Submit" /><br />
        </form>
    </>)
};
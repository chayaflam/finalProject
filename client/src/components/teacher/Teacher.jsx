import React, { useEffect, useState, useContext } from "react"
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { UserContext } from "../../main";
import { getFetchRequest } from "../fetch";
import { socket } from "../../socket";
import './Teacher.css'
import { Button } from "primereact/button";
 import { Image } from 'primereact/image';
const URL = "http://localhost:8080"
const imgUrl = '../../../public/img'

export default function Teacher() {

      const navigate = useNavigate();
      const [user, setUser] = useContext(UserContext)
      const [childrenList, setChildrenList] = useState([]);
      const [room, setRoom] = useState('');
      const [baby, setBaby] = useState();
      const location = useLocation()

      useEffect(() => {
            if (user) {
                  try {
                       
                        getFetchRequest(user, URL, 'child/teacher', [user.id])
                              .then(data => {
                                    setChildrenList(data);
                              })
                              getFetchRequest(user, URL, 'class/teacher', [user.id])
                              .then(data => {
                                    console.log(data[0].idNurseryclass)
                                    setRoom(data[0].idNurseryclass)
                              })
                  } catch {
                        alert("error")
                  }
            }
      }, [])


      const joinPrivateRoom = (baby, room) => {
            if (user.username !== '') {
                  let username = user.username;
                  socket.emit('join_room', { username, room });
            }
            navigate(`./baby/${baby.childName}`, { state: { addressee: baby.childId } });
      };

      const joinPublicRoom = () => {
            if (user.username !== '') {
                  let username = user.username;
                  socket.emit('join_room', { username, room });
            }
            navigate(`./chatAll`, { state: { addressee: room } });
      };



      const logout = () => {
            const cookies = Object.keys(Cookies.get());
            cookies.forEach(cookie => {
                Cookies.remove(cookie);
            });
          //  localStorage.clear()
            setUser(null)
            navigate('/')
      }

   
   
    return (
        <>
            <h1>Teacher</h1>
            <Button onClick={() => logout()}>Log out</Button>
        
            <div className="image-wrapper">
                <Button onClick={() => { setRoom(user.id); joinPublicRoom(); }} >Sending a message to all kindergarten children</Button>
                {childrenList.length && childrenList.map((baby, key) => (
                    <button key={key} onClick={() => {
                      
                        setRoom(baby.childId);
                        joinPrivateRoom(baby, baby.childId);
                    }}  >
                        <div className="image-circle">
                            <img src={`${imgUrl}/${baby.childName}.png `} alt={baby.childName} />
                        </div>
                    </button>
                ))}
            </div>
                <Outlet />
        </>
    );
}
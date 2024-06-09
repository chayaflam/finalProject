import React, { useEffect, useState, useContext } from "react"
import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { UserContext, BabyContext } from "../../main";
import { getFetchRequest } from "../fetch";
import { socket } from "../../socket";
import './Teacher.css'
import { Button } from "primereact/button";
import { Image } from 'primereact/image';
import { useNavigate } from 'react-router-dom';
const URL = "http://localhost:8080"

export default function Teacher() {
      const imgUrl = '../../../public/img'
      // const images = require.context('../../public/img', true);
      const navigate = useNavigate();
      const [user, setUser] = useContext(UserContext);
      const [baby, setBaby] = useContext(BabyContext)
      const [childrenList, setChildrenList] = useState([]);
      const [room, setRoom] = useState('');
      useEffect(() => {
            if (user) {
                  try {
                        getFetchRequest(user, URL, 'child', [user.id])
                              .then(data => {
                                    setChildrenList(data);
                              })
                  } catch {
                        alert("error")
                  }
            }
      }, [])

      const joinRoom = (childName) => {
            if (room !== '' && user.username !== '') {
                  username=user.username;
                  socket.emit('join_room', { username, room });
            }
            navigate(`./baby/${childName}`);
      };

      const logout = () => {
            localStorage.clear()
            setUser(null)
            navigate('/')
      }

      return (
            <>
                  <h1>Teacher</h1>
                  <Button onClick={() => logout()}>Log out</Button>
                  <div >
                        {childrenList.length && childrenList.map((baby, key) => {
                              // let img = ele.childName.replace(" ", "")


                              return <Button key={key} onClick={() => { setRoom(baby.childName); joinRoom(baby.childName); }}  >
                                    <Image src={`${imgUrl}/${baby.childName}.png `} />
                              </Button>
                        })}


                  </div>
                  <Outlet />
            </>
      )
}
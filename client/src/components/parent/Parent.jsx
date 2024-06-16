import React, { useEffect, useState, useContext } from "react"
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../main";
import { getFetchRequest } from "../fetch";
import { socket } from "../../socket";
import { Button } from "primereact/button";
import { Image } from 'primereact/image';


const URL = "http://localhost:8080"
const imgUrl = '../../../public/img'

export default function Parent() {
      const navigate = useNavigate();
      const [user, setUser] = useContext(UserContext)
      const [baby, setBaby] = useState({})
      const [room, setRoom] = useState('');

      useEffect(() => {
            if (user) {
                  try {
                        getFetchRequest(user, URL, 'child/parent', [user.id])
                              .then(data => {
                                    setBaby(data);
                              })
                  } catch {
                        alert("error")
                  }
            }
      }, [])

      const joinRoom = (baby) => {
            if (room !== '' && user.username !== '') {
                  username = user.username;
                  socket.emit('join_room', { username, room });
            }
            navigate(`./baby/${baby.childName}`, { state: { baby: baby } });
      };

      const logout = () => {
            localStorage.clear()
            setUser(null)
            navigate('/')
      }

      return (
            <>
                  <h1>PARENT!!!!!</h1>
                  <Button onClick={() => logout()}>Log out</Button>
                  <div >
                        {baby.length && baby.map((baby, key) => {
                              // let img = ele.childName.replace(" ", "")
                              return <Button key={key} onClick={() => {

                                    setRoom(baby.childId); joinRoom(baby);
                              }}  >
                                    <Image src={`${imgUrl}/${baby.childName}.png `} />
                              </Button>
                        })}
                  </div>
                  <Outlet />
            </>
      )
}
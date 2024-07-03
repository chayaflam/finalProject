import React, { useEffect, useState, useContext } from "react"
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../main";
import { getFetchRequest } from "../fetch";
import { socket } from "../../socket";
import { Button } from "primereact/button";
import { Image } from 'primereact/image';
import Cookies from 'js-cookie';
import './Parent.css'
import { CgProfile } from "react-icons/cg";
import { Sidebar } from 'primereact/sidebar';
const URL = "http://localhost:8080"
const imgUrl = '../../../public/img'

export default function Parent() {
      const navigate = useNavigate();
      const [user, setUser] = useContext(UserContext)
      const [baby, setBaby] = useState({})
      const [room, setRoom] = useState('');
      const token = Cookies.get('token');
      const [visibleRight, setVisibleRight] = useState(false);
      console.log(user)
      useEffect(() => {
            if (user) {
                  try {
                        getFetchRequest(user, URL, 'child/parent', token, [user.id])
                              .then(data => {
                                    setBaby(data);
                              })

                  } catch {
                        alert("error")
                  }
            }
      }, [])


      const joinRoom = (baby, room) => {
            console.log(baby.nurseryClassId)
            if (user.username !== '') {
                  let username = user.username;
                  let classId = baby.nurseryClassId;
                  socket.emit('join_room', { username, room});

            }
            navigate(`./baby/${baby.childName}`, { state: { baby: baby } });
      };

      return (
            <>  <h1>hi {user.name}</h1>
                  <Button onClick={() => setVisibleRight(true)} ><CgProfile /></Button>
                  <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                        <h2>Right Sidebar</h2>
                        <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                  </Sidebar>
                  <div >
                        {baby.length && baby.map((baby, key) => {
                              // let img = ele.childName.replace(" ", "")
                              return <Button key={key} onClick={() => {

                                    setRoom(baby.childId); joinRoom(baby, baby.childId);
                              }}  >
                                    <Image src={`${imgUrl}/${baby.childName}.png `} />
                              </Button>
                        })}
                  </div>

                  <Outlet />
            </>
      )
}


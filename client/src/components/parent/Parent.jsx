import React, { useEffect, useState, useContext } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../main";
import { getFetchRequest } from "../fetch";
import { socket } from "../../socket";
import { Button } from "primereact/button";
import { Image } from 'primereact/image';
import './Parent.css'
const URL = "http://localhost:8080"
const imgUrl = '../../../public/img'

export default function Parent() {
      const navigate = useNavigate();
      const [user, setUser] = useContext(UserContext)
      const [child, setChild] = useState({})

      useEffect(() => {
            if (user) {
                  try {
                        getFetchRequest(URL, 'child/parent', [user.id])
                              .then(data => setChild(data))
                  }
                  catch {
                        alert("error")
                  }
            }
      }, [])

      const joinRoom = (child, room) => {
            if (user.username !== '') {
                  let username = user.username;
                  socket.emit('join_room', { username, room });
            }
            navigate(`./child/${child.childName}`, { state: { child: child } });
      };

      return (
            <>  <h1>hi {user.name}</h1>
                  <div >
                        {child.length && child.map((child, key) => {
                              return <Button key={key} onClick={() => {
                                    setRoom(child.childId);
                                    joinRoom(child, child.childId);
                              }}  >
                                    <Image src={`${imgUrl}/${child.childName}.png `} />
                              </Button>
                        })}
                  </div>
                  <Outlet />
            </>
      )
}


import React, { useEffect, useState, useContext } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../main";
import { getFetchRequest } from "../fetch";
import { socket } from "../../socket";
import { Button } from "primereact/button";
import { Image } from 'primereact/image';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import './Parent.css'
const URL = "http://localhost:8080"
const imgUrl = '../../../public/img'

export default function Parent() {
      const navigate = useNavigate();
      const [user, setUser] = useContext(UserContext)
      const [child, setChild] = useState({});
      const ischildRoute = location.pathname.includes("child");

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

      const joinRoom = (data, room) => {
            if (user.username !== '') {
                  let username = user.username;
                  socket.emit('join_room', { username, room });
            }

            navigate(`./child/${data.childName}`, { state: { child: data } });
      };

      return (
            <>
                <h1 className="teacher-name">hi {user.name}</h1>
                <Outlet />
                {!ischildRoute && 
                    <div className="children-container">
                        <div className="babies">
                            {child.length && child.map((child, index) => (
                                <div key={index} className={`child-row ${index % 2 === 0 ? 'white-bg' : 'red-bg'}`} onClick={() => joinRoom(child, child.childId)} >
                                    <div className="image-circle">
                                        <img src={`${imgUrl}/${child.childName}.png`} alt={child.childName} />
                                    </div>
                                    <span className="child-name">{child.childName}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </>
        );
}


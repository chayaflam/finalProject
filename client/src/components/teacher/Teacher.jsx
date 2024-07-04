import React, { useEffect, useState, useContext } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../main";
import { getFetchRequest } from "../fetch";
import { socket } from "../../socket";
import './Teacher.css'
const URL = "http://localhost:8080"
const imgUrl = '../../../public/img'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function Teacher() {

      const navigate = useNavigate();
      const [user, setUser] = useContext(UserContext)
      const [childrenList, setChildrenList] = useState([]);
      const [publicRoom, setPublicRoom] = useState('');
      const [child, setchild] = useState();
      const location = useLocation()
      const ischildRoute = location.pathname.includes("child");
      const isChatAllRoute = location.pathname.includes("chatAll");

      useEffect(() => {
            if (user) {
                  try {
                        getFetchRequest(URL, 'child/teacher', [user.id])
                              .then(data => {
                                    setChildrenList(data);
                              })
                        getFetchRequest(URL, 'class/teacher', [user.id])
                              .then(data => {
                                    setPublicRoom(data[0].idChildrenclass)
                              })
                  }
                  catch {
                        alert("error")
                  }
            }
      }, [])

      const joinPrivateRoom = (child, room) => {
            if (user.username !== '') {
                  let username = user.username;
                  socket.emit('join_room', { username, room });
            }
            (ischildRoute || isChatAllRoute) ?
                  navigate(`../child/${child.childName}`, { state: { child: child } }) :
                  navigate(`./child/${child.childName}`, { state: { child: child } });
      };

      const joinPublicRoom = () => {
            if (user.username !== '') {
                  let username = user.username;
                  socket.emit('join_public_room', { username, publicRoom });
            }
            (ischildRoute || isChatAllRoute) ?
                  navigate(`../chatAll`, { state: { addressee: publicRoom, isPublicRoom: true } }) :
                  navigate(`./chatAll`, { state: { addressee: publicRoom, isPublicRoom: true } });
      };

      const handleChange = (event, newValue) => {
            let selectedchild = childrenList.find(child => child.childName === newValue);
            setchild(selectedchild);
            joinPrivateRoom(selectedchild, selectedchild.childId);
            navigate(`./child/${selectedchild.childName}`, { state: { child: selectedchild } });
      };

      return (
            <>
                  <h1 className="teacher-name">Hi, {user.name}</h1>
                  <div className="children-container">
                        <div className="autocomplete-container">
                              <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    onChange={handleChange}
                                    options={childrenList.map(child => child.childName)}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Search" />} />
                        </div>
                        <div className="babies">
                              {childrenList.map((child, index) => (
                                    <div key={index} className={`child-row ${index % 2 === 0 ? 'white-bg' : 'red-bg'}`} onClick={() => {
                                          joinPrivateRoom(child, child.childId);
                                    }}>
                                          <div className="image-circle">
                                                <img src={`${imgUrl}/${child.childName}.png`} alt={child.childName} />
                                          </div>
                                          <span className="child-name">{child.childName}</span>
                                    </div>
                              ))}
                              <div className="child-row" onClick={() => {
                                    joinPublicRoom();
                              }}>
                                    <span className="allClass">All Class</span>
                              </div>
                        </div>
                  </div>
                  <Outlet />
            </>
      );
}
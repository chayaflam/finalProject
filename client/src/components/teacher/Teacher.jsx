import React, { useEffect, useState, useContext } from "react"
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import { UserContext } from "../../main";
import { getFetchRequest } from "../fetch";
import { socket } from "../../socket";
import './Teacher.css'
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Image } from 'primereact/image';
import { IoIosSearch } from "react-icons/io";
import { FloatLabel } from "primereact/floatlabel";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Baby from "../baby/Baby";
const URL = "http://localhost:8080"
const imgUrl = '../../../public/img'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function Teacher() {

      const navigate = useNavigate();
      const [user, setUser] = useContext(UserContext)
      const [childrenList, setChildrenList] = useState([]);
      const [room, setRoom] = useState('');
      const [baby, setBaby] = useState();
      const location = useLocation()
      const token = Cookies.get('token');
      const [value, setValue] = useState('');
      const isBabyRoute = location.pathname.includes("baby");
      const isChatAllRoute = location.pathname.includes("chatAll");

      useEffect(() => {
            if (user) {
                  try {
                        getFetchRequest(user, URL, 'child/teacher', token, [user.id])
                              .then(data => {
                                    setChildrenList(data);
                              })
                        getFetchRequest(user, URL, 'class/teacher', token, [user.id])
                              .then(data => {
                                    setRoom(data[0].idNurseryclass)
                              })
                  } catch {
                        alert("error")
                  }
            }
      }, [])

      // useEffect(() => {
      //      baby&& navigate(`./baby/${baby.childName}`, { state: { addressee: baby.childId } });
      //   }, [baby])

      const joinPrivateRoom = (baby, room) => {
            if (user.username !== '') {
                  let username = user.username;
                  socket.emit('join_room', { username, room });
            }
             if(isBabyRoute||isChatAllRoute)
            navigate(`../baby/${baby.childName}`, { state: { addressee: baby.childId } }) 
      //        const baseUrl = window.location.origin + window.location.pathname;
      //        baseUrl=baseUrl.replace(`baby`,`baby/${baby.childName}`);
      //        console.log(baseUrl) // Get the base URL
      //       history.push(baseUrl + '/new-segment'); // Clear the end and add a new segment
      //       }
      else
            navigate(`./baby/${baby.childName}`, { state: { addressee: baby.childId } });
      };

      const joinPublicRoom = () => {
            if (user.username !== '') {
                  let username = user.username;
                  socket.emit('join_room', { username, room });
            }
             if(isBabyRoute||isChatAllRoute)
                  navigate(`../chatAll`, { state: { addressee: room } })
            else
                   navigate(`./chatAll`, { state: { addressee: room } });
      };
  
      // const handleChange = (event) => {
      //   let baby=event.target.value;         
      //   setValue(baby.childName);
      //   setRoom(baby.childId);
      //   joinPrivateRoom(baby,baby.childId);

      // };
      const handleChange = (event) => {
            let selectedBaby= childrenList.filter(baby=>baby==event)[0]
            setValue(selectedBaby.childName);
            setRoom(selectedBaby.childId);
            setBaby(selectedBaby); // Update the state with the selected baby
            joinPrivateRoom(selectedBaby, selectedBaby.childId);
      };
  
 

      return (
            <>
                  <h1 className="teacher-name">Hi, {user.name}</h1>
                  <div className="children-container">
                  <div className="autocomplete-container">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onChange={(event, newValue) => handleChange(newValue)}
                    options={childrenList.map(child => child.childName)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Search" />}
                    />
                  </div>
                  <div className="babies">
                  {childrenList.map((baby, index) => (
    <div key={index} className={`baby-row ${index % 2 === 0 ? 'white-bg' : 'red-bg'}`} onClick={() => {
        setRoom(baby.childId);
        joinPrivateRoom(baby, baby.childId);
    }}>
        <div className="image-circle">
            <img src={`${imgUrl}/${baby.childName}.png`} alt={baby.childName} />
        </div>
        <span className="baby-name">{baby.childName}</span>
    </div>
))}
    <div className="baby-row" onClick={() => {
        setRoom(user.id);
        joinPublicRoom();
    }}>
        <span className="baby-name">all class</span>
    </div>
</div>
                  </div>
           



                  {/* <Button onClick={() => { setRoom(user.id); joinPublicRoom(); }} >Sending a message to all kindergarten children</Button> */}
                  <Outlet />
            </>
      );
}
///------------------------------------------
      // return (
      //       <>
      //             <h1>Hi, {user.name}</h1>

      //             <div className="image-wrapper">
      //                   <Button onClick={() => { setRoom(user.id); joinPublicRoom(); }} >Sending a message to all kindergarten children</Button>
      //                   <div> 
      //                       {/* <Galeria childrenList={childrenList}/>
      //                         <Galeria children={childrenList}/> */}
      //                   </div>

      //                   <div className="childrenList">
      //                         {childrenList.length && childrenList.map((baby, key) => (
      //                               <button key={key} onClick={() => {

      //                                     setRoom(baby.childId);
      //                                     joinPrivateRoom(baby, baby.childId);
      //                               }}  >
      //                                     <div className="image-circle">
      //                                           <img src={`${imgUrl}/${baby.childName}.png `} alt={baby.childName} />
      //                                     </div>
      //                               </button>

      //                         ))}
      //                   </div>
      //             </div>
      //             <Outlet />
      //       </>
      // );
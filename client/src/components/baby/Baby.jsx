import React, { useEffect, useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import ChatRoom from "../chatRoom/ChatRoom";
import { useLocation, useParams } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import "./Baby.css"
import Cookies from 'js-cookie';
import { UserContext } from "../../main";
import { getFetchRequest } from "../fetch";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Teacher from "../teacher/Teacher";
import { child } from "firebase/database";
const imgUrl = '../../../public/img'

export default function Baby() {
    const URL = "http://localhost:8080"
    const location = useLocation();
    const [user, setUser] = useContext(UserContext)
    let { babyname } = useParams();
    console.log(babyname)
    const token = Cookies.get('token');
    const childId = location.state.baby.childId;
    const baby = location.state.baby;
    const [visibleRight, setVisibleRight] = useState(false);

   

 

    return (<>
        {/* <img className="baby" src={`${imgUrl}/${babyname}.png `} alt={babyname} />
        <p>{babyname}</p> */}
        <div className="container">
            <div className="teacher">
                <Teacher />
            </div>
            <div className="baby">
                <ImageListItem >
                    <img className="imgListItem" src={`${imgUrl}/${babyname}.png`} />
                    <ImageListItemBar
                        title={babyname}
                        actionIcon={

                            <IconButton
                                sx={{ color: '#febe52' }}
                                onClick={() => setVisibleRight(true)}
                            >
                                <InfoIcon />
                            </IconButton>
                        }
                    /></ImageListItem>
                <Sidebar  visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                    <h2>{baby.childId}</h2>
                    <h4>{baby.class}</h4>               
                    <h4>{baby.fatherCell}</h4>               
                    <h4>{baby.motherCell}</h4>               
                    <h4>{baby.homeCell}</h4>               
                    <h4>{baby.address}</h4>               
                    <h4>{baby.medicalProblem}</h4>               
                    <h4>{baby.maritalStatus}</h4>               
                    <h4>{baby.dateOfBirth}</h4>               

                </Sidebar>
                <ChatRoom addressee={childId}  />

            </div>
        </div>
    </>)
};










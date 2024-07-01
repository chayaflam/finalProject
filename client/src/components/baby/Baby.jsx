import React, { useEffect, useContext } from "react";
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
import Teacher from "../teacher/Teacher";
const imgUrl = '../../../public/img'

export default function Baby() {
    const URL = "http://localhost:8080"
    const location = useLocation();
    let { babyname } = useParams();
    console.log(babyname)
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
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            >
                                <InfoIcon />
                            </IconButton>
                        }
                    />
                </ImageListItem>

                <ChatRoom addressee={location.state.addressee} />
            </div>
        </div>
    </>)
};










import React, { useEffect, useContext, useState,useRef } from "react";
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
import { getFetchRequest, postFetchRequest } from "../fetch";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Teacher from "../teacher/Teacher";
import { child } from "firebase/database";
import { Chart } from 'primereact/chart';
const imgUrl = '../../../public/img'

export default function Baby() {
    const URL = "http://localhost:8080"
    const location = useLocation();
    const [user, setUser] = useContext(UserContext)
    let { babyname } = useParams();
    const token = Cookies.get('token');
    const childId = location.state.baby.childId;
    const baby = location.state.baby;
    const [visibleRight, setVisibleRight] = useState(false);
    const [displayChart, setDisplayChat] = useState(false);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const SizeOfLabels = 7;
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const yy=[];
    const xx = [];
    useEffect(() => {
        feedingDataPerWeek()
    }, []);

    async function feedingDataPerWeek() {

       await getFetchRequest(user, URL, "messages", [childId])
            .then(data => {
                data.map((day) => {
                    let totalNumber=day.total_number;
                    let date=day.day;
                    yy.push(totalNumber)
                    xx.push(date)
                })
            })
              const  data = {
                    labels: xx,
                    datasets: [
                        {
                            label: 'cc',
                            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                            borderColor: documentStyle.getPropertyValue('--blue-500'),
                            data: yy
                        }
                    ]
                };
                console.log(data)
                
              const  options = {
                    maintainAspectRatio: false,
                    aspectRatio: 0.8,
                    plugins: {
                        legend: {
                            labels: {
                                fontColor: textColor
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: textColorSecondary,
                                font: {
                                    weight: 500
                                }
                            },
                            grid: {
                                display: false,
                                drawBorder: false
                            }
                        },
                        y: {
                            ticks: {
                                color: textColorSecondary
                            },
                            grid: {
                                color: surfaceBorder,
                                drawBorder: false
                            }
                        }
                    }
                };

                setChartData(data);
                setChartOptions(options);
    }
    const displayDateOfBirth = (date) => {
        var data = new Date(date),
            month = '' + (data.getMonth() + 1),
            day = '' + data.getDate(),
            year = data.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

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
                <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                    <h2>{baby.childName}</h2>
                    <h3>Class<br /></h3> <h4>{baby.nurseryClassId}</h4>
                    <h3>Address<br /></h3> <h4> {baby.address}</h4>
                    <h3>FatherCell<br /> </h3> <h4>{baby.fatherCell}</h4>
                    <h3>MotherCell<br /> </h3> <h4>{baby.motherCell}</h4>
                    <h3>HomeCell<br /></h3> <h4> {baby.homeCell}</h4>
                    <h3>Allergies<br /></h3> <h4> {baby.allergies ? baby.allergies : "no"}</h4>
                    <h3>Medical problem<br /></h3> <h4> {baby.medicalProblem ? baby.medicalProblem : "no"}</h4>
                    <h3>Marital status<br /></h3> <h4> {baby.maritalStatus ? baby.maritalStatus : "regular"}</h4>
                    <h3>Date of birth<br /> </h3> <h4>{displayDateOfBirth(baby.dateOfBirth)}</h4>

                </Sidebar>
                {!displayChart && <ChatRoom addressee={childId} />}
                {displayChart && <>

                    <div>
                        <h1>Weekly eating monitoring</h1>
                        <div className="card">
                            <Chart type="bar" data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </>}
            </div>
            {!displayChart && <button onClick={() => setDisplayChat(true)}>chart</button>}
            {displayChart && <button onClick={() => setDisplayChat(false)}>close</button>}
        </div>
    </>)
};
























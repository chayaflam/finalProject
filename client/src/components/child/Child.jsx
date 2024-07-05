import React, { useEffect, useState, useContext } from "react";
import ChatRoom from "../chatRoom/ChatRoom";
import { useLocation, useParams } from "react-router-dom";
import "./Child.css"
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { getFetchRequest } from "../fetch";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Teacher from "../teacher/Teacher";
import { Chart } from 'primereact/chart';
import { UserContext } from "../../main";
import Parent from "../parent/Parent";
const imgUrl = '../../../public/img'

export default function child() {
    const URL = "http://localhost:8080"
    const location = useLocation();
    let { childname } = useParams();
    const childId = location.state.child.childId;
    const child = location.state.child;
    const [visibleRight, setVisibleRight] = useState(false);
    const [displayChart, setDisplayChat] = useState(false);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const verticalAxis = [];
    const horizontalAxis = [];
    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
        feedingDataPerWeek()
    }, [childname]);

    async function feedingDataPerWeek() {

        await getFetchRequest(URL, "messages", [childId])
            .then(data => {
                data.map((day) => {
                    let totalNumber = day.total_number;
                    let date = day.day;
                    !verticalAxis.includes(totalNumber) && verticalAxis.push(totalNumber)
                    !horizontalAxis.includes(date) && horizontalAxis.push(date)
                })
            })
        const data = {
            labels: horizontalAxis,
            datasets: [
                {
                    label: 'cc',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: verticalAxis
                }
            ]
        };
        console.log(data)

        const options = {
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
        <div className="container">
            {user.status == "teacher" &&
                <div className="teacher">
                    <Teacher />
                </div> }
            <div className="child">
                <ImageListItem >
                    <img className="imgListItem" src={`${imgUrl}/${childname}.png`} />
                    <ImageListItemBar
                        title={childname}
                        actionIcon={
                            <IconButton
                                sx={{ color: '#febe52' }}
                                onClick={() => setVisibleRight(true)}>
                                <InfoIcon />
                            </IconButton>
                        }
                    /></ImageListItem>
                <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                    <h2>{child.childName}</h2>
                    <h3>Class<br /></h3> <h4>{child.childrenClassId}</h4>

                    <h3>Address<br /></h3> <h4> {child.address}</h4>
                    <h3>FatherCell<br /> </h3> <h4>{child.fatherCell}</h4>
                    <h3>MotherCell<br /> </h3> <h4>{child.motherCell}</h4>
                    <h3>HomeCell<br /></h3> <h4> {child.homeCell}</h4>
                    <h3>Allergies<br /></h3> <h4> {child.allergies ? child.allergies : "no"}</h4>
                    <h3>Medical problem<br /></h3> <h4> {child.medicalProblem ? child.medicalProblem : "no"}</h4>
                    <h3>Marital status<br /></h3> <h4> {child.maritalStatus ? child.maritalStatus : "regular"}</h4>
                    <h3>Date of birth<br /> </h3> <h4>{displayDateOfBirth(child.dateOfBirth)}</h4>


                    
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
            {!displayChart && <Button onClick={() => setDisplayChat(true)}>chart</Button>}
            {displayChart && <Button onClick={() => setDisplayChat(false)}>close</Button>}
        </div>
    </>)
};
























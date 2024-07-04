import React, { useContext, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import Logo from '../../../public/img/Kidder.jpg';
import { Menubar } from 'primereact/menubar';
import 'primeicons/primeicons.css';
import './Header.css';
import { UserContext } from "../../main.jsx";
import Cookies from 'js-cookie';
import calendar from '../../../public/img/calendar.jpg'
import HomePage from "../homePage/HomePage.jsx";
import Calendar from "../calendar/Calendar.jsx";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { SlHome } from "react-icons/sl";

export default function Header() {
    const navigate = useNavigate();
    const start = <img alt="logo" src={Logo} className="logo"></img>;
    const [user, setUser] = useContext(UserContext);
    const footerRef = useRef(null);
    const location = useLocation();
    const [displayDialog, setDisplayDialog] = useState(false);

    const isCalendarRoute = location.pathname === '/calendar';
    user && console.log(user)
    const items = [
        {
            label: !user ? 'Login' : 'Home',
            command: () => navigate(!user ? '/login' : `/${user.status}/${user.username}`),
            icon: !user ?'pi pi-user':<SlHome className="icon"/>
        },

        {
            label: 'About us',
            command: () => scrollToFooter(),
            icon: 'pi pi-search',
        },
        {
            label: 'Calendar',
            command: () => {navigate("/calendar"), window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            })},
            icon: 'pi pi-calendar'

        },
        {
            label: 'Weekly Events',
            command: () =>user? navigate("/events"):loginNavigate(),
            icon: 'pi pi-palette'
        },
        user != null && {
            label: 'Log Out',
            command: () => logout(),
            icon: 'pi pi-sign-out'
        }
    ];

    const logout = () => {
        const cookies = Object.keys(Cookies.get());
        cookies.forEach(cookie => {
            Cookies.remove(cookie);
        });
        setUser(null);
        navigate('/');
    }

    const scrollToFooter = () => {
        if (footerRef.current) {
            footerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };


    const loginNavigate = () => {
        setDisplayDialog(true);
    };

    const onHide = () => {
        setDisplayDialog(false);
    };
    return (
        <>
            <nav>
                <div className="card">
                    <Menubar model={items} start={start} />
                </div>
            </nav>
            {!user && !isCalendarRoute && (
                <div>
                    <div className="homePageImgCard">
                        <img className="homePageImg" src="../../../public/img/homePage.jpeg" />
                        <p className="pHomePage">A child's surroundings influences them At Kindergarden,
                            <br /> we recognize that your child’s surroundings can affect them,<br />and for that
                            reason, we’ve carefully considered everything we do.<br /> <b>Absolutely everything.</b><br />That’s the secret of
                            Kindergarden.<br /> And if everything influences your child, then we want to ensure that this influence is
                            positive. We’d be delighted to tell you more about this. Come along for a visit!</p>
                    </div>
                </div>
            )}

            <Outlet />
            {!user && (<div ref={footerRef} className="card_footer">
                <footer className="footer">
                    <p className="grid-item">Phone Numbers Comments: 202-456-1111</p>
                    <p className="grid-item">Switchboard: 202-456-1414 FAX: 202-456-2461</p>
                    <p className="grid-item">TTY/TDD Comments: 202-456-6213 Visitors</p>
                    <p className="grid-item">Office: 202-456-2121</p>
                    <p className="grid-item">Email: kidder@org.co.uk</p>
                </footer>
            </div>)}
            <div>
         
            <Dialog visible={displayDialog} onHide={onHide}>
                <h2>Login Required</h2>
                <p>You need to login to access this feature.</p>  
                <Button label="OK" onClick={onHide} />
            </Dialog>
        </div>
        </>
    );
}






const MyComponent = () => {
   

  
};
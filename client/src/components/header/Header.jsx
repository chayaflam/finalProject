import React, { useEffect, useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from '../../../../img/logo.png'
import { Menubar } from 'primereact/menubar';
import 'primeicons/primeicons.css';
import './Header.css'
import { useNavigate } from 'react-router-dom';


export default function Header() {
    const navigate = useNavigate();
    const start = <img alt="logo" src={Logo} height="40" className="mr-2"></img>;
    const items = [

        {
            label: 'Register',
            to: "/",
            icon: 'pi pi-star'
        },
        {
            label: 'About us',
            to: "/",
            icon: 'pi pi-search',


        },
        {
            label: 'Calender',
            to: "/",
            icon: 'pi pi-envelope'
        },
        {
            label: 'Weekly events',
            to: "/",
            icon: 'pi pi-envelope'
        }

    ];


    return (<>
        <nav >
       
            <div className="card">
            <img src={Logo} className="logo" />
                <Menubar model={items} />
            </div>

            {/* <div>
                <NavLink to="/">About us</NavLink>
                <NavLink to="/">Register</NavLink>
                <NavLink to="/">Calender</NavLink>
                <NavLink to="/">Weekly events</NavLink>
            </div> */}
        </nav>


        <Outlet />
    </>)
};
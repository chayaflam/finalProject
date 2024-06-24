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
            label: 'Login',
            icon: 'pi pi-user',
        },
        {
            label: 'Register',
            icon: 'pi pi-star'
        },
        {
            label: 'About us',
            icon: 'pi pi-search',


        },
        {
            label: 'Calender',
            icon: 'pi pi-envelope'
        },
        {
            label: 'Weekly events',
            icon: 'pi pi-envelope'
        }

    ];




    return (<>
        <nav >
            <img src={Logo} />
            <NavLink to="/login" icon="pi pi-user">Login</NavLink>
            <NavLink to="/">About us</NavLink>
            <NavLink to="/">Register</NavLink>
            <NavLink to="/">Calender</NavLink>
            <NavLink to="/">Weekly events</NavLink>
        </nav>


        <Outlet />
    </>)
};
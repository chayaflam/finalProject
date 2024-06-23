import React, { useEffect, useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from '../../../../img/logo.png'
import { Menubar } from 'primereact/menubar';
import 'primeicons/primeicons.css';
import './Header.css'


export default function Header() {
    const start = <img alt="logo" src={Logo} height="40" className="mr-2"></img>;
    const items = [

        {
            label: 'Login',
            icon: 'pi pi-home'
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
        <img className="logo" src={Logo} />
        <div className="card">

            <Menubar model={items} />
        </div>
        {/* //================ */}
        <nav>
            {/* <img src={Logo} />
            <NavLink to="/login" icon="pi pi-user">Login</NavLink>
            <NavLink to="/">About us</NavLink>
            <NavLink to="/">Register</NavLink>
            <NavLink to="/">Calender</NavLink>
            <NavLink to="/">Weekly events</NavLink> */}
        </nav>
        <Outlet />
        <img className="homePageImg" src="../../../public/img/homePage.jpg" />

    </>)
};
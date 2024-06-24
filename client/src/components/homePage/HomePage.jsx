import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import 'primeicons/primeicons.css';
import './HomePage.css'
export default function HomePage() {

    return (<>
        <NavLink to="/login" icon="pi pi-user">Login</NavLink>
        <img className="homePageImg" src="../../../public/img/homePage.jpeg" />
    </>)
};
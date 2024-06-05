import React, { useEffect, useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import './Header.css'


export default function Header() {

    return (<>
        <nav>
            <NavLink to="/login" icon="pi pi-user">Login</NavLink>
            <NavLink to="/">About us</NavLink>

        </nav>

        <Outlet />
    </>)
};
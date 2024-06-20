import React, { useEffect, useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from '../../../../img/Logo.jpg'
import 'primeicons/primeicons.css';
import './Header.css'


export default function Header() {
 
    return (<>
        <nav>
            <img src={Logo} />
            <NavLink to="/login" icon="pi pi-user">Login</NavLink>
            <NavLink to="/">About us</NavLink>

        </nav>
        <h2>A child's surroundings influences them</h2>
        <h3> At Kindergarden, we recognize that your child’s surroundings can affect them, and for that<br />
            reason, we’ve carefully considered everything we do. Absolutely everything. That’s the secret of<br />
            Kindergarden. And if everything influences your child, then we want to ensure that this influence is<br />
            positive. We’d be delighted to tell you more about this. Come along for a visit!</h3>

        <Outlet />
    </>)
};
import React, { useEffect, useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from '../../../../img/logo.png'
import 'primeicons/primeicons.css';



export default function NoPage() {

    return (<>
        <nav>
            <img src={Logo} />

            <h1>ooooops!!!!</h1>
            <h2>🤪🤪🤪🤪</h2>
        </nav>
    </>)
};
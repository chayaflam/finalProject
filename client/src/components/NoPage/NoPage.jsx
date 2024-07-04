import React from "react";
import kidder from '../../../public/img/Kidder.jpg';
import './NoPage.css'; 
import { NavLink } from 'react-router-dom';

const NoPage = () => {
    return (
        <div className="error-page">
            <img id="errorImage" src={kidder} alt="Kidder Logo" />
            <h1>404 Error!</h1>
            <p>Sorry, the page you are looking for could not be found.</p>
            <NavLink to="/">Go back to Home</NavLink>
        </div>
    );
};

export default NoPage;
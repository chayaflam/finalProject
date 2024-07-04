// import React, { useEffect, useContext } from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import kidder from '../../../public/img/Kidder.jpg'
// import 'primeicons/primeicons.css';



// export default function NoPage() {

//     return (<>
//         <nav>
//             <img id="errorImage" src={kidder} />

//             <h1>404 E!!!!</h1>
        
//         </nav>
//     </>)
// };

import React from "react";
import kidder from '../../../public/img/Kidder.jpg';
import './NoPage.css'; // Import your CSS file for styling
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
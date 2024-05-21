import React, { useEffect, useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function Teacher() {
      let username = "GinnyWeasly"
      let path = `./baby/${username}`
      return (
            <>
                  <h1>Teacher!!!!!</h1>
                  <NavLink to="./baby" > <img src="../img/Jinny Weasly.png" /></NavLink>
                  <Outlet />
            </>
      )
}
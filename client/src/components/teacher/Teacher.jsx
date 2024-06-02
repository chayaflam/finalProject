import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../../main";
import { getFetchRequest } from "../fetch";
import HarryPotter from '../../img/HarryPotter.png'
import GinnyWeasley from '../../img/GinnyWeasley.png'
import RonWeasley from '../../img/RonWeasley.png'
import ChatRoom from "../chatRoom/ChatRoom";


export default function Teacher() {
      const URL = "http://localhost:8080"

      const [user, setUser] = useContext(UserContext)
      const [childrenList, setChildrenList] = useState([]);
      useEffect(() => {
            if (user) {
                  try {
                        const result = getFetchRequest(user, URL, 'child', [user.id])
                        setChildrenList(children=>[result]);
                  } catch {
                        alert("kkkk")
                  }
            }
      }, [])

      return (
            <>

                  <h1>Teacher</h1>
                  <div >
                        {childrenList.map(ele=>{
                             <NavLink to={`./baby/${ele.childName}`}>< img height={100} width={100} src={ele.childName.replace(" ", "")} /></NavLink> 
                        })}
                        {/* <NavLink to='./baby/HarryPotter'>< img height={100} width={100} src={HarryPotter} /></NavLink>
                        <NavLink ><img height={100} width={100} src={GinnyWeasley} /></NavLink>
                        <NavLink ><img height={100} width={100} src={RonWeasley} /></NavLink> */}
                        <Outlet />

                  </div>
            </>
      )
}
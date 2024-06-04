import React, { useEffect, useState, useContext } from "react"
import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { UserContext, BabyContext } from "../../main";
import { getFetchRequest } from "../fetch";
import './Teacher.css'
import { Button } from "primereact/button";
import { Image } from 'primereact/image';
import { useNavigate } from 'react-router-dom';
const URL = "http://localhost:8080"

export default function Teacher() {
      const imgUrl = '../../../public/img'
      // const images = require.context('../../public/img', true);
      const navigate = useNavigate();
      const [user, setUser] = useContext(UserContext);
      const [baby, setBaby] = useContext(BabyContext)
      const [childrenList, setChildrenList] = useState([]);
      useEffect(() => {
            if (user) {
                  try {
                        getFetchRequest(user, URL, 'child', [user.id])
                              .then(data => {
                                    setChildrenList(data);
                              })
                  } catch {
                        alert("error")
                  }
            }
      }, [])

      const logout = () => {
            localStorage.clear()
            setUser(null)
            navigate('/')
      }

      return (
            <>
                  <h1>Teacher</h1>
                  <Button onClick={() => logout()}>Log out</Button>
                  <div >
                        {childrenList.length && childrenList.map((baby, key) => {
                              // let img = ele.childName.replace(" ", "")


                              return <NavLink key={key} onClick={setBaby(baby)} to={`./baby/${baby.childName}`}  >
                                    <Image src={`${imgUrl}/${baby.childName}.png `} />
                              </NavLink>
                        })}


                  </div>
                  <Outlet />
            </>
      )
}
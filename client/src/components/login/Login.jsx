import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserContext } from "../../main";
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { postFetchRequest } from "../fetch";
import Cookies from 'js-cookie';
import kidder from '../../../public/img/Kidder.jpg'
import './Login.css'

const URL = "http://localhost:8080"

export default function Login() {

    const [user, setUser] = useContext(UserContext)
    const [visible, setVisible] = useState(true);
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const cookies = Object.keys(Cookies.get());
            cookies.forEach(cookie => {
                Cookies.remove(cookie);
            });
            setUser(null);
            navigate('/');
        }
        else {
            navigate('/login')
        }
    }, [])

    async function loginHandleSubmit(data) {
        await postFetchRequest(URL, 'auth/login', [data], (dataFromServer) => {
            setUser({ username: data.username, id: dataFromServer.result.id, status: dataFromServer.result.statusUser, name: dataFromServer.result.name });
            Cookies.set('user', JSON.stringify({ username: data.username, id: dataFromServer.result.id, status: dataFromServer.result.statusUser, name: dataFromServer.result.name }));
            localStorage.setItem('user', JSON.stringify({ username: data.username, id: dataFromServer.result.id, status: dataFromServer.result.statusUser, token: dataFromServer.token }))
            navigate(`/${dataFromServer.result.statusUser}/${data.username}`);
        }, (status) => alert("Error: " + status));
    }

    return (<>
        <div className="card flex justify-content-center">
            <Dialog
                visible={visible}
                modal
                onHide={() => { if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <form onSubmit={handleSubmit(loginHandleSubmit)}>
                        <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: ' radial-gradient(circle at left top,#fffcf5,#fffcf5)' }}>
                            <img alt="logo" src={kidder} className="logo" />
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="username" className="font-semibold labelText">
                                    Username
                                </label>
                                <InputText type="username" id="username" name="username" {...register("username")} label="Username" className=" border-none p-3 text-primary-50 inputText"></InputText>
                            </div>
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="username" className="labelText font-semibold">
                                    Password
                                </label>
                                <InputText type="password" name="password" id="password" {...register("userPassword")} label="Password" className="inputText border-none p-3 text-primary-50" ></InputText>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <Button type="submit" value="Submit" label="Submit" text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-write-alpha-10"></Button>
                                <Button label="Cancel" onClick={(e) => { hide(e); navigate('/') }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-red-alpha-10"></Button>
                            </div>
                        </div>
                    </form>
                )}
            ></Dialog>
        </div>
    </>
    )
}
import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserContext } from "../../main";
import { getFetchRequest, postFetchRequest } from "../fetch";
const URL = "http://localhost:8080"

export default function Login() {

    const [user, setUser] = useContext(UserContext)
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            try {
                getFetchRequest(user, URL, 'user', [user.username])
                if (json) navigate(`/users/${user.username}`)
            } catch {
                alert("Unauthorized user")
            }
        }
        navigate('/login')
    }, [])

    async function loginHandleSubmit(data) {
        let status;
        await postFetchRequest(URL, 'auth/login', [data])
            .then(res => {
                setUser(prev => ({ ...prev, username: data.username, id: res.result.id }));
                localStorage.setItem('user', JSON.stringify({ username: data.username, id: res.result.id, status: res.result.statusUser, token: res.token }))
                navigate(`/${res.result.statusUser}/${data.username}`);
            }
            ).catch(error => { alert(error) })
    }

    return (
        <>
            <div className="login">
                <form onSubmit={handleSubmit(loginHandleSubmit)}>
                    <h3 >LOGIN HERE</h3>
                    <label>Username:<input type="text" name="username" {...register("username")} /></label><br />
                    <label>Password:<input type="password" name="password" {...register("userPassword")} /></label><br />
                    <input type="submit" value="Submit" /><br />
                    <a href="/register">new user? register here</a>
                </form>
            </div>
        </>
    )
}
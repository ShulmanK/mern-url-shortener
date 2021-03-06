import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/httphook'
import {useMessage} from '../hooks/messagehook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {message} = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email:'',
        password:''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        }catch(err){
            // throw err
        }
    }

    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        }catch(err){
            // throw err
        }
    }


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>
                    Short a link
                </h1>

                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div className="input-field">
                            <input
                                placeholder="Input email"
                                id="email"
                                type="text"
                                name="email"
                                className="yellow-input"
                                value={form.email}
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field">
                            <input
                                placeholder="Input password"
                                id="password"
                                type="password"
                                name="password"
                                className="yellow-input"
                                value={form.password}
                                onChange={changeHandler}
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                    </div>




                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                        >LogIn</button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
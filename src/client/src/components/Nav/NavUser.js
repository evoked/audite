import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"
import UsersList from '../Users.js'
import Profile from '../Profile.js'
import UserLogin from '../UserLogin.js'

const NavUser = () => {
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('token')) setAuth(true)
    }, [])
        return (
            <div>
                {auth ? <nav>
                    <Link to="/">Home </Link>
                    <Link to="/users"> Users </Link>
                    <Link to="/profile"> Profile </Link>
                    <Link to="/logout"> Profile </Link>
                    </nav> : <nav>
                    <Link to="/">Home </Link>
                    <Link to="/users"> Users </Link>
                    <Link to="/login"> Login</Link>
                    <Link to="/register"> Register</Link>
                    </nav>
                }
            </div>
        )
    }

export default NavUser;

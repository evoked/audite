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
import axios from 'axios';

const NavUser = () => {
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('token')) setAuth(true)
    }, [])
        return (
            <div>
                {auth ? 
                    <nav className="navbar-auth">
                    <Link to="/">Home </Link>
                    <Link to="/users"> Users </Link>
                    <Link to="/settings"> Settings </Link>
                    </nav> 
                    : 
                    <nav className="navbar-noauth">
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

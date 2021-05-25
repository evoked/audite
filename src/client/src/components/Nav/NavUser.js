import React, { useState, useEffect } from 'react';
import {
    Link
  } from "react-router-dom"

const NavUser = () => {
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('token')) setAuth(true)
    }, [])
        return (
            <div>
                {auth ? 
                    <nav className="navbar-auth">
                    <Link to="/home">Home </Link>
                    <Link to="/users"> Users </Link>
                    <Link to="/settings"> Settings </Link>
                    </nav> 
                    : 
                    <nav className="navbar-noauth">
                    <Link to="/">Home </Link>
                    <Link to="/users"> Users </Link>
                    <Link to="/register"> Register</Link>
                    </nav>
                }
            </div>
        )
    }

export default NavUser;

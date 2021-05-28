import React, { useState } from 'react'
import { UserLoginAuth } from "../services/authentication.js";

const UserLogin = () => {
    const [response, setResponse] = useState('')
    const [user, setUser] = useState({ 
        username: '', 
        password: '' 
    })

    const handleLoginSubmission = (e) => {
        e.preventDefault()
        UserLoginAuth(user, setResponse)
    }

    const handleUserInput = (e) => {
        /* Setting values, getting both input state parameter, and the sent value */
        const {value, placeholder} = e.target
        let param = placeholder.toLowerCase()
        /* Setting the user using object manipulation */
        setUser({
            ...user,
            [param]: value
        })
    }

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={handleLoginSubmission}>
                <input type="text" placeholder="Username" value={user.username} onChange={handleUserInput}></input>
                <input type="text" placeholder="Password" value={user.password} onChange={handleUserInput}></input>
                <input type="submit" value="Submit" />
            </form>
            <p>{response}</p>
        </div>
    )
}

export default UserLogin

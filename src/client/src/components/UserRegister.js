import React, { useState } from 'react';
import { registerUser } from '../services/user';

const UserRegister = () => {
    const [response, setResponse] = useState('')
    const [user, setUser] = useState({ 
        username: '', 
        password: '', 
        email: ''
    })

    /* Checking if user has entered valid details */
    const userVerification = () => {
        if (user.username.length < 2 || user.username.length > 30) {
            setResponse('username must be within 3-30 characters long') 
            return false
        } else if (user.password.length < 6) { 
            setResponse('password must be longer than 6 characters')
            return false
        } else if (user.email.length < 6 || !user.email.includes("@")) {
            setResponse('email must be valid')
            return false
        }
        return true
    }

    const handleSubmission = (e) => {
        e.preventDefault()
        if(userVerification()) registerUser(user, setResponse)
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
            <h3>Register</h3>
            <form onSubmit={handleSubmission}>
                <input type="text" placeholder="Username" value={user.username} onChange={handleUserInput}></input>
                <input type="text" placeholder="Password" value={user.password} onChange={handleUserInput}></input>
                <input type="text" placeholder="Email"    value={user.email}    onChange={handleUserInput}></input>
                <input type="submit" value="Submit" />
            </form>
            <p>{response}</p>
        </div>
    )
}

export default UserRegister

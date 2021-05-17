import React, { useState } from 'react';
import axios from 'axios'

const registerUser = async (user, response) => {
    axios({method: 'POST',
        url: 'http://localhost:3001/register',
        data: {...user}
    })
    .then(res => {
        response(res.data + ', redirecting...')
        setTimeout(() => {
            window.location.href="/login"
        }, 3000)
    })
    .catch(rej => response(rej.response.data))
} 

const UserRegister = () => {
    const [response, setResponse] = useState('')
    const [user, setUser] = useState({ 
        username: '', 
        password: '', 
        email: ''
    })

    const credentialVerification = () => {
        if (user.username.length < 2 || user.username.length > 30) {
            setResponse('username must be within 3-30 characters long') 
            return false
        } else if (user.password.length < 6) { 
            setResponse('password must be longer than 6 characters')
            return false
        } else if (user.email.length < 6) {
            setResponse('email must be valid')
            return false
        }
        return true
    }

    const handleSubmission = (e) => {
        e.preventDefault()
        if(credentialVerification()) registerUser(user, setResponse)
    }

    const handleUserInput = (e) => {
        /* Setting values, getting both input state parameter, and the sent value */
        const param = e.target.placeholder.toLowerCase()
        const value = e.target.value
        /* Setting the user using object manipulation */
        setUser({
            ...user,
            [param]: value
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmission}>
                <input type="text" placeholder="Username" value={user.username} onChange={handleUserInput}></input>
                <input type="text" placeholder="Email"    value={user.email}    onChange={handleUserInput}></input>
                <input type="text" placeholder="Password" value={user.password} onChange={handleUserInput}></input>
                <input type="submit" value="Submit" />
            </form>
            <p>{response}</p>
        </div>
    )
}

export default UserRegister
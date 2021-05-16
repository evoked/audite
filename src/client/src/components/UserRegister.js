import React, { useState } from 'react';
import axios from 'axios'

const registerUser = async (user, response) => {
    axios({method: 'POST',
        url: 'http://localhost:3001/register',
        data: {...user}
    })
    .then(res => response(res.data))
    .catch(rej => response(rej.response.data))
} 

const UserRegister = () => {
    const [response, setResponse] = useState('')
    const [user, setUser] = useState({ 
        username: '', 
        password: '', 
        email: '',
    })

    const handleSubmission = (e) => {
        e.preventDefault()
        registerUser(user, setResponse)
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
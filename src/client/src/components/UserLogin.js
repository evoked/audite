import React, { useState } from 'react'
import axios from 'axios'

const UserLoginAuth = async (user, setResponse, token) => {
    try {
        /* If localStorage already includes a token, then nothing is excecuted. */
        if (localStorage.getItem('token')) { 
            setResponse('already logged in, redirecting...')
            return setTimeout(() => {
                window.location.href="/"
            }, 3000)
        }
        /* check if details not satisfied correctly */
        let {username, password} = user
        if (!username || !password) return setResponse('please enter your details')

        // ? {data: { username, password }}
        // : {headers: {authorization: token}}

        await axios.post('http://localhost:3001/login', {
            ...user
        }).then(response =>{ 
            /* If response is 201 (which it always should be on success,
                just adding as a small measure), then add token to localStorage.
                    window is then redirected to main page.*/
            if (response.status === 201) {
                UserLoginSuccess(response.data, setResponse)
                setTimeout(() => {
                    window.location.href="/"
                }, 3000)
            }
        }).catch(err => {
            /* If post has error (account does not exist or wrong credentials) then  */
            UserLoginFail(err.response.data, setResponse)
        })
    } catch (e) {
        throw e
    }
}

const UserLoginSuccess = async (user, response) => {
    response(`${user.success}, redirecting...`)
    localStorage.setItem('token', user.token)
}

const UserLoginFail = async (error, response) => {
    response(`${error}, please try again`)
    localStorage.clear('token')
}

const UserLogin = () => {
    const [response, setResponse] = useState('')
    const [user, setUser] = useState({ 
        username: '', 
        password: '', 
    })

    const handleSubmission = (e) => {
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
            <form onSubmit={handleSubmission}>
                    <input type="text" placeholder="Username" value={user.username} onChange={handleUserInput}></input>
                    <input type="text" placeholder="Password" value={user.password} onChange={handleUserInput}></input>
                <input type="submit" value="Submit" />
            </form>
            <p>{response}</p>
        </div>
    )
}

export default UserLogin
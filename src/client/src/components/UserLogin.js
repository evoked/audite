import React, { useState } from 'react'
import axios from 'axios'
// import { render } from '@testing-library/react'
// import { useState } from 'react'

const UserLoginAuth = async (username, password, setResponse, token) => {
    try {
        /* If localStorage already includes a token, then nothing is excecuted. */
        if (localStorage.getItem('token')) return setResponse('lready logged in')
        /* check if details not satisfied correctly */
        if (!username || !password) return setResponse('please enter your details')
        let userRequest = {username, password}

        // ? {data: { username, password }}
        // : {headers: {authorization: token}}

        let response = await axios.post('http://localhost:3001/login', {
            ...userRequest
        }).catch(res => {
            /* If post has error (account does not exist or deta) */
            console.log(res.status)
            UserLoginFail(res.data, setResponse)
            return
        })
        /* If response is 201, then set localStorage to token */
        if (response.status === 201) UserLoginSuccess(response.data, setResponse) 
    } catch (e) {
        // throw new Error(e.response.data.error)
        console.log(e)
    }
}

const UserLoginSuccess = async (user, response) => {
    try {
        response('successfully logged in, redirecting...')
        localStorage.setItem('token', user.token)
    } catch (e) {
        throw (new Error(e.response.data.error))
    }
}

const UserLoginFail = async (user, response) => {
    try {
        response('incorrect credentials, please try again')
        localStorage.clear('token')
    } catch (e) {
        throw (new Error(e.response.data.error))
    }
}

const UserLogin = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [response, setResponse] = useState('')

    const handleSubmission = (e) => {
        e.preventDefault()
        UserLoginAuth(user, password, setResponse)
    }
    
    // render() {
        return (
            <div>
                <form onSubmit={handleSubmission}>
                        <input type="text" placeholder="Username" value={user} onChange={e => setUser(e.target.value)}></input>
                        <input type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
                    <input type="submit" value="Submit" />
                </form>
                <p>{response}</p>
            </div>
        )
    // }
}

export default UserLogin
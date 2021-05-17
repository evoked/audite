import axios from 'axios'
import React, { useEffect, useState } from 'react'

const GetProfile = async () => {
    try {
        const response = await axios.get('http://localhost:3001/profile', { 
            method: 'GET',
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') 
        }}).catch(e => {throw new Error('no auth')})
        return response.data
    } catch (e) {
        throw e
    }
    // setUser(response.data)
}

const UserProfile = () => {
    const [auth, setAuth] = useState('')
    const [user, setUser] = useState({username: '', created: '', email: ''})

    /* On component load, try to get user personal profile */
    useEffect(() => {
        setAuth('loading...')
        GetProfile()
        .then(res => {
            console.log('res')
            setAuth(true)
            setUser(res.user)})
        /* If error is thrown (no authentication), then auth will be kept false */
        .catch(e => setAuth(`${e}`))
    }, [])

    return(
        <div>
            <h2>Profile:</h2>
            {/* todo: seperate component views */}
            <div>{user.username ? <p> {user.username} {user.created} {user.email}</p> : <p>{auth}</p>}</div>
        </div>
    )
}



export default UserProfile
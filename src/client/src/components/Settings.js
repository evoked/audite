import axios from 'axios'
import React, { useEffect, useState } from 'react'

const getProfile = async () => {
        /* Creating an axios GET request, using the authorization header to 
            verify users authentication */
    let response = await axios.get('http://localhost:3001/settings', { 
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') 
        }}).catch(e => {
            throw new Error('no auth')
        })
        console.log(response)
        return response.data
    // setUser(response.data)
}

const userDelete = async () => {
    let response = await axios({
        method: 'POST',
        url: 'http://localhost:3001/settings/delete',
        headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
    }).catch(err => console.log(err.response))
    return response.data
}

const userLogout = async () => {
    await axios({
        method: 'GET',
        url: 'http://localhost:3001/logout'
    })
    .then(res => {
        localStorage.removeItem('token')
        window.alert(res.data.message)
        window.location.href="/login"
    })
    .catch(err => {
        console.log(err.response)
    })
}

const UserProfile = () => {
    const [auth, setAuth] = useState('')
    const [user, setUser] = useState({username: '', created: '', email: ''})

    /* On component load, try to get user personal profile */
    useEffect(() => {
        setAuth('loading...')
        getProfile()
        .then(res => {
            setAuth(true)
            setUser(res.user)
        })
        /* If error is thrown (no authentication), then auth will be kept false */
        .catch(e => {
            console.log(e)
            setAuth(`${e}`)
        })
    }, [])

    return(
        <div>
            <h2>Profile:</h2>
            {/* todo: seperate component views */}
            <div className="userCard">
                {
                user.username ? 
                    <p> {user.username} {user.created.slice(0,10)} {user.email}
                    <button onClick={userLogout}>Logout</button> 
                    <button onClick={() => {
                        userDelete()
                        userLogout()
                    }}>Delete Account</button></p>
            : 
            <p>{auth}</p>}</div>
        </div>
    )
}



export default UserProfile

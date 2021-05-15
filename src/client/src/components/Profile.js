import axios from 'axios'
import React, { useEffect, useState } from 'react'

const GetProfile = async () => {
    try {
        const response = await axios.get('http://localhost:3001/profile', { 
            method: 'GET',
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') 
        }})
        return response.data
    } catch (e) {

    }
    // setUser(response.data)
}

const UserProfile = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        GetProfile()
        .then(res => {
            console.log(res)
            setUser(res.user)})
    }, [])

    return(
        <div>
            <h2>Profile:</h2>
            <div>{user ? <p> {user.username} {user.created} {user.email}</p> : <p>you must sign in to view your profile</p>}</div>
        </div>
    )
}



export default UserProfile
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getProfile, userDelete, userLogout } from '../services/user'


const UserProfile = () => {
    const [response, setResponse] = useState('')
    const [user, setUser] = useState({username: '', created: '', email: ''})

    /* On component load, try to get user personal profile */
    useEffect(() => {
        setResponse('loading...')
        getProfile()
        .then(res => {
            /* Setting auth to true  */
            setResponse(true)
            setUser(res.user)
        })
        /* If error is thrown (no authentication), then auth will be kept false */
        .catch(e => {
            console.log(e)
            setResponse(`${e}`)
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
            <p>{response}</p>}</div>
        </div>
    )
}



export default UserProfile

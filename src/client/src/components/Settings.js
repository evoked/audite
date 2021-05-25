import React, { useEffect, useState } from 'react'
import { getProfile, userDelete, userLogout } from '../services/user'

const UserProfile = () => {
    const [response, setResponse] = useState('')
    const [user, setUser] = useState({username: '', created: '', email: ''})

    /* On component load, try to get user personal profile */
    useEffect(() => {
        setResponse('loading...')
        /* Get local user settings, sending authentication header as data */
        getProfile()
        .then(res => {
            /* Setting reponse to true when getProfile returns data */
            setResponse(true)
            setUser(res.user)
        })
        /* If error is thrown (no authentication), then auth will be kept false */
        .catch(e => {
            setResponse(`${e}`)
        })
    }, [])

    return(
        <div>
            <h2>Profile:</h2>
            <div className="userCard">
                {
                user.username ? 
                    <p> {user.username} {user.created.slice(0,10)} {user.email}
                    {/* Logout button, calls userLogout function which clears all local and 
                        serverside information about current login */}
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

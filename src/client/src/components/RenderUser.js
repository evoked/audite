import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

const getForeignUser = async (user, response) => {
    const res = await axios.get(`http://localhost:3001/user/${user}`)
    .catch(err => {
        response(err.response.data.error)
        return err.response.data.error
    })
    if(res) return res.data
}

const buildJoinDate = (parsedDate) => {
    let date = parsedDate.slice(0,10)
    date = date.split('-')
    date = `created at: ${date[0]} ${date[1]} ${date[2]}`
    return date
}

const RenderUser = () => {
    let { username } = useParams()
    const [user, setUser] = useState({username: '', created: '', email: ''})
    const [response, setResponse] = useState('loading...')

    useEffect(() => {
        getForeignUser(username, setResponse)
        .then(user => {
            if(user) setUser(user)
            let x = buildJoinDate(user.created)
            setUser({...user, created: x})
        }).catch(err => {
            console.log(err)
        })
        // if(callUser === "user not found") setResponse(callUser)
    }, [])

    return (
            <div>
                {user.username ?  
                <div>
                <h2>{user.username}</h2>
                <h3>{user.created}</h3>
                {console.log(user)}
                </div>
                
                :
                <p>{response}</p>
                }
            </div>
    )
}

export default RenderUser;
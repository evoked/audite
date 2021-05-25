import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import RenderEmbeds from './RenderEmbeds';

const getForeignUser = async (user, response) => {
    const res = await axios.get(`http://localhost:3001/user/${user}`)
    .catch(err => {
        response(err.response.data.error)
        return err.response.data.error
    })
    if(res) return res.data
}

const RenderUser = () => {
    let { username, pageId } = useParams()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [response, setResponse] = useState('loading...')
    const [hasPosts, setHasPosts] = useState(false)
    
    const buildJoinDate = (parsedDate) => {
        let date = parsedDate.slice(0,10)
        date = date.split('-')
        date = `user created on: ${date[0]} ${date[1]} ${date[2]}`
        return date
    }

    const pageIterator = (num, type) => {
        switch(type){
            case('increment'):
                if(num)
                num++
                return window.location.href=`${num}` 
            case('decrement'):
                num--
                return window.location.href=`${num}` 
            default:
                return 'type must be either `increment` or `decrement`'
            }
    }

    useEffect(() => {
        getForeignUser(username, setResponse)
        .then(userData => {
            if(userData) setUser({...userData, created: buildJoinDate(userData.created)})
            if(userData.posts.length > 0) setHasPosts(true)
            console.log(user)
        })
            .catch(err => {
                console.log(err)
            })
            setLoading(true)
        }, [])

        return (
            <div>
        {loading ?  
            <div>
            <h2>{user.username}</h2>
            <h3>{user.created}</h3>
            <ul>
            {
            hasPosts === true ? 
                <div className="embed-container">
                    <RenderEmbeds pageId={pageId} userPosts={user.posts} /> 
                    <div className="page-select">
                        <button className="btn-page-select" onClick={() => pageIterator(pageId, 'decrement')}>Previous</button>
                        Page: {pageId}
                        <button className="btn-page-select" onClick={() => pageIterator(pageId, 'increment')}>Next</button>
                    </div>
                </div>
            : 
                <p>{response}</p>
            }
            </ul>
            </div>
        :
        <p>{response}</p>
        }
    </div>
    )
}

export default RenderUser;
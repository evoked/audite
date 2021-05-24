import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import YouTubeEmbed from './YouTubeEmbed';

const getForeignUser = async (user, response) => {
    const res = await axios.get(`http://localhost:3001/user/${user}`)
    .catch(err => {
        response(err.response.data.error)
        return err.response.data.error
    })
    if(res) return res.data
}



const RenderUser = () => {
    let { username } = useParams()
    const [user, setUser] = useState({username: '', created: '', email: ''})
    const [response, setResponse] = useState('loading...')
    const [page, setPage] = useState(0)
    const [embeds, setEmbeds] = useState([])

    const buildJoinDate = (parsedDate) => {
        let date = parsedDate.slice(0,10)
        date = date.split('-')
        date = `created at: ${date[0]} ${date[1]} ${date[2]}`
        return date
    }

    const renderPage = (pageNum) => {
        
    }

    useEffect(() => {
        getForeignUser(username, setResponse)
        .then(user => {
            if(user) setUser(user)
            setUser({...user, created: buildJoinDate(user.created)})
            user.posts.length < 1 ? setPage('user does not have any posts') : setPage(1)
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
                <ul>
                {user.posts.map((post, key) => {
                    return (<li key={key}><YouTubeEmbed embedId={post.video_url}/>{post.text_body}</li>)
                })}
                </ul>
                {page}
                </div>
                
                :
                <p>{response}</p>
                }
            </div>
    )
}

export default RenderUser;
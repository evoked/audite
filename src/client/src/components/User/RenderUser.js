import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import RenderEmbeds from './RenderEmbeds';
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
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [response, setResponse] = useState('loading...')
    const [page, setPage] = useState(0)
    
    const buildJoinDate = (parsedDate) => {
        let date = parsedDate.slice(0,10)
        date = date.split('-')
        date = `created at: ${date[0]} ${date[1]} ${date[2]}`
        return date
    }
    
    
    // useEffect(() => {
        //     let posts = []
        //     for (let index = page; index < index * 5; index++) {
            //         // if(getter.length === 0 ) return
            //         const post = user.posts[index]
            //         posts.push(post)
            //         // setter([...embeds, post])
            //         console.log(posts)
            //     }
            //     return
            // }, [page])
            
            useEffect(() => {
                getForeignUser(username, setResponse)
                .then(userData => {
                    // if(user) setUser({...userData, created: buildJoinDate(user.created)})
                    setUser(userData)
                    if(userData.posts.length > 0) setPage(1)
                    // console.log(user)
                    // setLoading(true)
                })
                // .then(() => {
                    // user.posts.length === 0 ? setResponse('user does not have any posts') : setPage(1)})
                    .catch(err => {
                        console.log(err)
                    })
                    setLoading(true)
                    // setPage(1)
                    // if(callUser === "user not found") setResponse(callUser)
                }, [])

                console.log(page)
                
                // useEffect(() => {
                //     if(!user) return
                //     setEmbeds(constructPage(page))
                // }, [page])
                
                return (
                    <div>
                {loading ?  
                <div>
                <h2>{user.username}</h2>
                <h3>{user.created}</h3>
                <ul>
                    {/* {console.log(page)} */}
                {page !== 0 ? 
                 <RenderEmbeds page={page} userPosts={user.posts} /> : 
                 <p>{response}</p>}
                </ul>
                </div>
                
                :
                <p>{response}</p>
                }
            </div>
    )
}

export default RenderUser;
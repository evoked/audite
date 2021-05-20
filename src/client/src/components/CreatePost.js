import axios from 'axios';
import React, { useState } from 'react';

const UserPostCreate = async (url, body) => {
    try {
        let res = await axios.post('http://localhost:3001/post/new',{
            headers: {authorization: 'Bearer ' + localStorage.getItem('token')},
            data: {
                url,
                body
            }
        })
        return res.data
    } catch (e) {
        throw new Error(e.response.data.error)
    }
}

const CreatePost = () => {
    const [ post, setPost ] = useState({video_url: '', post_body: ''})
    const [ response, setResponse] = useState('please enter a youtube URL, and the text you want to post along with it')

    const handlePostSubmission = (e) => {
        e.preventDefault()
        const { video_url, post_body } = post
        /* Checking if URL is longer than YouTube video ID's */
        if((video_url.length < 11 || video_url.length > 64) || !video_url.includes('youtu')) {
            setResponse('! you must enter a valid URL !')
            return
        }
        /* Checking if body is too long */
        if(post_body.length > 64) {
            setResponse('! text body cannot be longer than 64 characters !')
            return
        }
        
        setResponse('posting...')
        let parsedURL = video_url.slice(video_url.length - 11, video_url.length)
        console.log(parsedURL, post_body)
        // UserPostCreate(parsedURL, text_body)
    }

    const handleUserInput = (e) => {
        const {value, name} = e.target
        let param = name.toLowerCase()
        /* Setting the user using object manipulation */
        setPost({
            ...post,
            [param]: value
        })
        console.log(post)
    }

        return (
            <div>
                <form onSubmit={handlePostSubmission}>
                    <input type="text" placeholder="YouTube video URL"  name="video_url" value={post.video_url} onChange={handleUserInput}></input>
                    <input type="text" placeholder="Post body" name="post_body" value={post.text_body} onChange={handleUserInput}></input>
                    <input type="submit" value="Create Post" />
                </form>
                <p>{response}</p>

            </div>
        );
}

export default CreatePost;
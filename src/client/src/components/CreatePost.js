import axios from 'axios';
import { Error } from 'mongoose';
import React, { useState } from 'react';

const userPostCreate = async (url, body, response) => {
    try {
        /* Calling isUrlValid using url given by user, this function checks if the youtube video
            supplied is real or not by calling the YouTube API  */
        await isUrlValid(url)
            .catch(err => {throw err})

        await axios('http://localhost:3001/post/new', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            data: {
                url: url,
                body: body
            }
        })
        .then(res => {
            response('post created')
            window.location.href="/home"
            return res.data
        })
        .catch(e => {throw new Error(e)})
    } catch (e) {
        response(e.message)
        return e
    }
}

const isUrlValid = async (url) => {
    await axios.get(`http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${url}&format=json`)
    .then(res => {
        return
    })
    .catch(rej => {
        throw new Error('error, video does not exist, please make sure your link is entered correctly')
    })
}

const CreatePost = () => {
    const [ post, setPost ] = useState({video_url: '', post_body: ''})
    const [ response, setResponse] = useState('please enter a youtube URL, and the text you want to post along with it')

    const handlePostSubmission = (e) => {
        e.preventDefault()
        let { video_url, post_body } = post
        video_url = video_url.trim()
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
        userPostCreate(parsedURL, post_body, setResponse)
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

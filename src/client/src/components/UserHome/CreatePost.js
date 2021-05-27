import React, { useState } from 'react';
import { userPostCreate } from '../../services/post';

const CreatePost = () => {
    const [ post, setPost ] = useState({video_url: '', post_body: ''})
    const [ response, setResponse] = useState('please enter a youtube music video URL, and the text you want to go along with it')

    const handlePostSubmission = (e) => {
        e.preventDefault()
        let { video_url, post_body } = post
        video_url = video_url.trim()
        /* Checking if URL is longer than YouTube video ID's */
        if((video_url.length < 11 || video_url.length > 64) || !video_url.includes('youtu')) {
            setResponse('you must enter a valid URL')
            return
        }
        /* Checking if body is too long */
        if(post_body.length > 300) {
            setResponse('text body cannot be longer than 300 characters')
            return
        }
        
        setResponse('posting...')
        let parsedURL = video_url.slice(video_url.length - 11, video_url.length)
        userPostCreate(parsedURL, post_body, setResponse)
    }

    const handleUserInput = (e) => {
        /* Gathering html tag values */
        const {value, name} = e.target
        let param = name.toLowerCase()
        /* Setting the user using object manipulation, spread syntax */
        setPost({
            ...post,
            [param]: value
        })
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

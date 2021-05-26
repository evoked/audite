import React, { Component } from 'react'
import YouTubeEmbed from './YouTubeEmbed'
import { Link } from "react-router-dom";

class RenderEmbeds extends Component {
    constructor(props) {
        /* Setting whatever was passed to component as props to class props */
        super(props)
        /* Using array as state allows use of value mapping with .map */
        this.state = { renderPosts: [] }
    }

    componentDidMount() {
        /* Initilize empty array for pushing post information */
        let posts = []
        /* For loop lets index be the pageId, mutliplies it by 5, and takes 5 off the result.
            The iteration amount is then limited to pageId * 5, meaning that there will only be 5 total iterations.
            This then results in the posts of the page index being pushed to the array of posts.
            */
        for (let index = Math.floor((this.props.pageId * 5) - 5); index <= (this.props.pageId * 5); index++) {
            if(this.props.userPosts[index] === undefined) break
            posts.push(this.props.userPosts[index])
            if(posts.length === 5) break
        }

        this.setState({renderPosts: posts})
    }

    /* Rendering embedded YouTube player component, along with the post details, 
        and a link to the YouTube video*/
    render() {
        return(<div className="user-post">
            {this.state.renderPosts[0] ? 
            this.state.renderPosts.map((el, index) => {
                return <li className="embed-body" key={index}>
                    <YouTubeEmbed embedId={el.video_url} /> 
                    <p className="embed-body-text">{el.text_body}</p>    
                    <Link to={{pathname: `https://www.youtube.com/watch?v=${el.video_url}`}} target="_blank">Watch on YouTube</Link>
                    <p></p>
                </li>
            })
            : <p>user has no more posts</p>}</div>)
    }
}


export default RenderEmbeds
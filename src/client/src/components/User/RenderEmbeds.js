import React, { Component } from 'react'
import YouTubeEmbed from './YouTubeEmbed'
import { Link } from "react-router-dom";

class RenderEmbeds extends Component {
    constructor(props) {
        super(props)
        this.state = { renderPosts: [] }
    }

    componentDidMount() {
        let posts = []
        for (let index = Math.floor((this.props.pageId * 5) - 5); index <= (this.props.pageId * 5); index++) {
            if(this.props.userPosts[index] === undefined) break
            posts.push(this.props.userPosts[index])
            if(posts.length === 5) break
        }

        this.setState({renderPosts: posts})
        }

    render() {
        return(<div className="user-post">
            {this.state.renderPosts[0] ? 
            this.state.renderPosts.map((el, index) => {
                return <li className="embed-body" key={index}>
                    <YouTubeEmbed embedId={el.video_url} /> 
                    <p className="embed-body-text">{el.text_body}</p>    
                    <Link to={{pathname: `https://www.youtube.com/watch?v=${el.video_url}`}} target="_blank">Watch on YouTube</Link>
                </li>
            })
            : <p>user has no more posts</p>}</div>)
    }
}


export default RenderEmbeds
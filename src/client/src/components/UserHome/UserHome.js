import React, { Component, useEffect, useState } from 'react';
import axios from 'axios'
import CreatePost from '../CreatePost';
import PostList from './PostList';
import { Link } from 'react-router-dom';

class UserHome extends Component {
    constructor(props) {
        super(props)
        this.state = { user: [], response: ''}
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/user/${localStorage.getItem("username")}`)
            .then(user => {
                this.setState({...this.state, user: user.data})
                console.log(this.state)
                this.state.user.posts.length > 0 ? 
                this.setState({...this.state, response: `or, make some changes to your posts?`}) :
                this.setState({...this.state, response: `you don't seem to have any posts, you should add some!`})
                console.log(this.state)
            })
    }

    deletePost = async (post) => {
        axios({
            method: 'POST',
            url: 'http://localhost:3001/post/delete',
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
            data: {
                _id: post._id
            }
        })
        window.alert(`post ${post.video_url} has been deleted.`)
        window.location.href="/home"
    }

    render() {
        return (
            <div>
                <h2>Hey, {localStorage.getItem("username")}!</h2>
                <h3>Create a post?</h3>
                <CreatePost />
                { this.state.user.posts ?
                    <div>
                        <h3>{this.state.response}</h3>
                        <ul>
                        {this.state.user.posts.map(post => {
                            return (<li key={post._id}><Link to={{pathname: `https://youtube.com/watch?v=${post.video_url}`}} target="_blank">youtube.com/{post.video_url}</Link>
                                    <p>{post.text_body} <button onClick={() => this.deletePost(post)}>Delete</button> </p>
                            </li>)
                        })}
                        </ul>
                    </div>
                :
                <h3>{this.state.response}</h3>
                }
            </div>
        )
    }
}

export default UserHome
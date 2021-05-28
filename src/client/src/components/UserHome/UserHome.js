import React, { Component } from 'react';
import CreatePost from './CreatePost';
import { Link } from 'react-router-dom';
import { getLocalUser } from '../../services/user';
import { deletePost } from '../../services/post';


class UserHome extends Component {
    constructor(props) {
        super(props)
        this.state = { user: [], response: ''}
    }

    /* On component inital render */
    componentDidMount() {
        /* Calling API to gather local user information */
        getLocalUser(localStorage.getItem("username"))
            .then(user => {
                this.setState({...this.state, user: {...user.data, posts: user.data.posts.reverse()}})
                console.log(this.state)
                /* Conditional check to see if user has made any posts */
                this.state.user.posts.length > 0 ? 
                /* Using spread operations to ensure that the rest of the state is unchanged */
                this.setState({...this.state, response: `or, make some changes to your posts?`}) :
                this.setState({...this.state, response: `you don't seem to have any posts, you should add some!`})
            })
            .catch(err => {
                window.location.href="/"
            })
    }

    render() {
        return (
            <div>
                <h2>Hey, {localStorage.getItem("username")}!</h2>
                <h3>Create a post?</h3>
                <CreatePost />
                {/* Conditional render,
                    renders the user's posts, populated with the respective URL,
                    text, and delete button.
                    Also renders appropriate response dependant on whether user has posts or not
                */}
                { this.state.user.posts ?
                    <div>
                        <h3>{this.state.response}</h3>
                        <ul>
                        {this.state.user.posts.map(post => {
                            return (<li key={post._id}><Link to={{pathname: `https://youtube.com/watch?v=${post.video_url}`}} target="_blank">youtube.com/{post.video_url}</Link>
                                    <p>{post.text_body} <button onClick={e => deletePost(e, post)}>Delete</button> </p>
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
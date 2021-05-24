import React, { useState, useEffect, Component } from 'react'
import YouTubeEmbed from './YouTubeEmbed'
import PropTypes from 'prop-types'
import { render } from '@testing-library/react'

// import React, { Component } from 'react';

class RenderEmbeds extends Component {
    constructor(props) {
        super(props)
        this.state = { renderPosts: [] }
    }

    componentDidMount() {
        // console.log(this.props)
        // setTimeout(() => {
            let posts = []
            for (let index = this.props.page - 1; index <= (this.props.page * 5); index++) {
                // if(userPosts[index - 1] === undefined) break
                // console.log(userPosts[index - 1])
                // if (index === 0) {
                    if(this.props.userPosts[index] === undefined) break
                    posts.push(this.props.userPosts[index])
                // } else {
                    // posts.push(this.props.userPosts[index])
                // }
                // console.log(index)
                console.log(posts)
                if(posts.length === 5) break
            }
            this.setState({renderPosts: posts})
            
            // this.setState(this.state.renderPosts.filter(post => {
            //     return post !== undefined
            // }))
            console.log(this.state.renderPosts)
            // if(this.state.renderPosts.isEmpty) setPosts(posts)
            // }, 1)
            // setPosts(posts)
            // console.log(this.state.renderPosts)
        }

    render() {
        return(<div>
            {this.state.renderPosts[0] ? 
            this.state.renderPosts.map((el, index) => {
                // console.log(el.video_url)
                return <li key={index}><YouTubeEmbed embedId={el.video_url} /> {el.text_body}</li>
            }) 
            : <p>test</p>}</div>)
    }
}
// return ( 
//         <div>
//             {this.state.renderPosts.map((post, key) => {
//                 return('hi')
//                 // return(<YouTubeEmbed embedId={post.video_url}/> )
//             })}
//             </div>
//         )

// const RenderEmbeds = (props) => {
//     const {page, userPosts} = props
//     let posts = []
//     const [renderedPosts, setPosts] = useState([])

//     useEffect(() => {
//         setTimeout(() => {
//             for (let index = page - 1; index <= (page * 5); index++) {
//                 // if(userPosts[index - 1] === undefined) break
//                 // console.log(userPosts[index - 1])
//                 let post = userPosts[index]
//                 // console.log(index)
//                 posts.push(post)
//                 console.log(posts.length)
//                 if(posts.length === 5) break
//             }
//             console.log(posts)
//             if(renderedPosts.isEmpty) setPosts(posts)
//         }, 1)
//         // setPosts(posts)
//     }, [])
    
            

//     return (renderedPosts.map((post, key) => {
//         return(<div>
//         <li key={key}><YouTubeEmbed embedId={post.video_url}/>{post.text_body}</li> 
//         </div>
//     )}))

// }

// RenderEmbeds.propTypes = {
//     pageNum: PropTypes.number.isRequired,
//     user: PropTypes.number.isRequired,
//   };

export default RenderEmbeds
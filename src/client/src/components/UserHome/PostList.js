import React, { useEffect } from 'react';

const PostList = props => {
    const posts = props
    console.log(posts)
    return (
        <div>
            <ul>
                {/* {posts ? 
                posts.map(post => {
                    return(
                        <p>post.video_url</p>
                    )
            })
            :
            <p>loading...</p>
            } */}
            </ul>
        </div>
    );
};

export default PostList;
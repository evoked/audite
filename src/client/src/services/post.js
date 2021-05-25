import axios from "axios"

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


/**
 * Deletes post called on current user button press by calling API endpoint
 * @param {Object} post 
 */
const deletePost = async (event, post) => {
    axios({
        method: 'POST',
        url: 'http://localhost:3001/post/delete',
        headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
        data: {
            _id: post._id
        }
    })
    .then(() => {
        window.alert(`post ${post.video_url} has been deleted.`)
        window.location.href="/home"
    })
    .catch(err => {
        console.log(`${err}, could not delete post`)
    })
}

export { deletePost, userPostCreate }
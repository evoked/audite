import User from "../models/UserSchema.model";
import Post from "../models/PostSchema.model";
/**
 * Creates a new user post, and ensures that the parent doc (user) references the new post
 * @param {*} req 
 * @param {*} res 
 * @returns {status, object}
 */
module.exports.create = async (req, res) => {
    const user = res.locals.user
    const { url, body } = req.body
    try {
        if(!url) throw new Error('you must include a url')
        
        /* Creating post with information passed by user */
        const post = new Post({
            author: user._id,
            video_url: url,
            text_body: body,
            posted: Date.now()
        })

        /* Adding ref to parent doc */
        await User.findByIdAndUpdate(user._id).exec((err, user) => {
            if(!user) throw new Error('user does not exist')
            user.posts.push(post)
            user.save()
        })
        
        /* Finally, saving post */
        await post.save((err, post) => {
            if(err) throw new Error('post could not be saved')
            return res.status(201).send(
                (`${post.video_url} has been saved`)
            )
        })
    } catch (e) {
        console.log(e)
        return res.status(401).send(e)
    }
}

module.exports.delete = async (req,res) => {
    const user = res.locals.user
    const { _id } = req.body

    try {
        if(!_id || !user) throw new Error('you must include the post id')

        await Post.findByIdAndDelete(_id, (err) => {
            if (err) throw new Error('unable to find post')
        })

        /* Making sure parent doc no longer references post doc */
        User.findOne({posts: {_id: _id}}, (err, user) => {
            if(err) throw new Error('error')
            user.posts.pull({_id: _id})
            user.save()
        })
        
        console.log(_id + 'has been deleted')
        return res.status(201).send({message: "successfully deleted post"})
    } catch (e) {
        return res.status(401).send(e.message)
    }
}
import User from "../models/UserSchema.model";
import Post from "../models/PostSchema.model";

module.exports.createPost = async (req, res) => {
    const user = res.locals.user
    const { url, body } = req.body
    try {
        if(!url) throw new Error('you must include a url')
    
        const post = new Post({
            author: user._id,
            video_url: url,
            text_body: body,
            posted: Date.now()
        })

        await User.findByIdAndUpdate(user._id).exec((err, user) => {
            user.posts.push(post)
            user.save()
        })

        // await User.findById(user._id).exe
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

module.exports.removePost = async (req,res) => {
    
}
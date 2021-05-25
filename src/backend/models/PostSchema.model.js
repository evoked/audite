let mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    /* Creating the referral link between a post and user */
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    video_url: {
        type: String,
        trim: true
    },
    text_body: {
        type: String,
        trim: true
    },
    posted: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Post', PostSchema) 

let mongoose = require('mongoose')
// import UserSchemaModel from './UserSchema.model'

const PostSchema = new mongoose.Schema({
    data: {
        body: {
            type: String,
            trim: true
        },
        video_link: {
            type: String,
            trim: true
        }
    },
    details: {
        user_id: {
            type: String,
            trim: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
})
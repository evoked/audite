import PostSchemaModel from './PostSchema.model'

let mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    password: {
        type: String
    },
    biography: {
        type: String,
        trim: true,
        maxLength: 120
    },
    /* Creating the referral link between a user and their posts*/
    posts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post'
    }]
})
/**
 * Function that returns all date information as an object. Useful for date stuff!
 * @returns {Object}    object storing all date data
 */
UserSchema.methods.createdDetails = function() {
    return {
        year: this.created.getUTCFullYear(),
        month: this.created.getUTCMonth(), 
        date: this.created.getUTCDate(), 
        day: this.created.getUTCDay(), 
        hour: this.created.getUTCHours(), 
        minute: this.created.getUTCMinutes(), 
        second: this.created.getUTCSeconds()
    }
}

UserSchema.methods.getDate = function() {
    return {
        year: this.created.getUTCFullYear(),
        month: this.created.getUTCMonth(), 
        date: this.created.getUTCDate(), 
    }
}
export default mongoose.model('User', UserSchema) 

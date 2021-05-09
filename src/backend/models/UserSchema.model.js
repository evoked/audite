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
    connections: {
        type: String
    }, posts: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Post"
    }
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

export default mongoose.model('User', UserSchema) 
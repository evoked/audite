import { User } from "../models/UserSchema.model";
import { Post } from "../models/PostSchema.model";

import request from 'request'

// const urlCheck = (url) => {
//     if(!url) return false
// }

module.exports.createPost = async (req, res) => {
    const user = res.locals.user
    const { url, text_body } = req.body
    // have something for community too

    try {
        if(!url) throw new Error('url not entered')
        // url.trim().toLowerCase().
        
    } catch (e) {

    }


}
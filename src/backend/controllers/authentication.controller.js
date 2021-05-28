import User from '../models/UserSchema.model'
import jwt from 'jsonwebtoken'

/**
 * Allows user to login if details are correct, 
 * passes the client a token to use with authenticated routes.
 * @param {*} req 
 * @param {*} res 
 * @returns {token, message} returns JWT token
 */
 module.exports.login = async (req, res) => {
    const { username, password} = req.body
    
    try {
        /* Checking server-side if login details are satisfied in order to continue with request */
        if (!username || !password) throw (new Error('account details not satisfied'))
        await User.findOne({username: username, password: password})
        /* If successfully found a user with credentials then go forward to .then statement */
        .then(user => {
            if(!user || user._id === undefined) {throw new Error('user not found')}
            /* Creating the token using JWT sign, converting the user's ID into a base64 encrypted string 
                using the access token generated */
            const token = jwt.sign({data: user._id}, process.env.ACCESS_TOKEN_SECRET)
            if(!token || token.length === 0) {throw new Error('invalid auth')}
            req.session.authorization = `Bearer ${token}`
            console.log(`${username} has logged in @ ${req.connection.remoteAddress}`)
            res.status(201).send({token: token, success: `successfully logged in as '${user.username}'`, username: user.username})
            return
        })
        .catch(e => {
            console.log(e)
            throw new Error('user not found')
        })
        
    } catch (e) {
        return res.status(401).send(e.message)
    }
}

module.exports.authenticateToken = async (req, res, next) => {
    try {
        const auth = req.headers.authorization
        if(!auth) throw new Error('no auth header')
        const token = auth.split(' ')[1]
        /* If token is non-existant or has mistakenly been put into localStorage, then return error */
        if(token === "null" || token.length < 5) throw (new Error('no auth'))
        /* Process JWT verification using token passed by user, 
            will parse an error if the token is not valid */
        let {data} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        await User.findById(data)
        .exec((err, user) => {
            if(!user || err) throw(new Error('user not found, token invalid'))
            /* Parsing user as a new object, because 'user' is a mongoose document, and cannot have any
                properties dropped as a result. Allowing to drop password into seperate variable */
            let {password, __v, ...parsedUser} = user.toObject()
            // console.log(parsedUser)
            /* Setting locals to parsedUser, to be used in the next server-side service */
            res.locals.user = parsedUser
            /* Directing to next middleware/controller */
            return next()
        })
    } catch (e) {
        console.log('error', e)
        return res.status(400).send(e)
    }
}

module.exports.logout = async (req, res) => {
    try {
        /* Setting everything to null so user auth is no longer feasible until next logged in */
        console.log(req.session.authorization, req.session.headers)
        res.locals.user = null
        req.headers.authorization = null
        req.session.authorization = null
        res.status(200).json({message: 'you are now logging out'})
    } catch (e) {
        res.status(401).json(e)
    }
}

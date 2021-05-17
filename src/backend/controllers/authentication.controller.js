import User from '../models/UserSchema.model'
import jwt from 'jsonwebtoken'

/**
 * zzz
 * @param {*} req 
 * @param {*} res 
 * @returns {token, message} returns JWT token
 */
 module.exports.login = async (req, res) => {
    // const { authorization } = req.headers
    // if(!auth) return res.status(401).send({ error: `not authorized` })#
    
    const { username, password} = req.body
    
    try {
        /* Checking server-side if login details are satisfied in order to continue with request */
        if (!username || !password) throw (new Error('account details not satisfied'))

        await User.find({username: username, password: password})
        .then(user => {
            const token = jwt.sign({data: user[0]._id}, process.env.ACCESS_TOKEN_SECRET)
            req.session.authorization = `Bearer ${token}`
            res.status(201).send({token: token, success: `successfully logged in as '${user[0].username}'`})
            return
        })
        .catch(e => {
            if(e) throw new Error('user not found')
        })
        /* If no returned users from (.find), then array user will be empty array */
        // if(user.length < 1) throw (new Error('user not found'))
        /* Creating the token using JWT sign, converting the user's ID into a base64 encrypted string 
            using the access token generated */
        
    } catch (e) {
        console.log(e)
        return res.status(404).send('user not found')
    }
}

module.exports.authenticateToken = async (req, res, next) => {
    try {
        const auth = req.headers.authorization

        const token = auth.split(' ')[1]
        /* If token is non-existant or has mistakenly been put into localStorage, then return error */
        if(token === "null" || token.length < 5) throw (new Error('no auth'))
        /* Process JWT verification using token passed by user, 
            will parse an error if the token is not valid */
        let {data} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        await User.findById(data, (err, user) => {
            if(!user || err) throw(new Error('user not found, token invalid'))
            /* Parsing user as a new object, because 'user' is a mongoose document, and cannot have any
                properties dropped as a result. */
            let userObj = user.toObject()
            /* Dropping password into seperate variable */
            let {password, __v, ...parsedUser} = userObj
            /* Setting locals to parsedUser, to be used in the next server-side service */
            res.locals.user = parsedUser
        })
        /* Directing to next middleware/service */
        return next()
    } catch (e) {
        return res.status(400).send(e)
    }
}

module.exports.logout = async (req, res) => {
    try {
        // console.log(`${res.locals} ${req.session.authorization}`)
        // if (!req.session.authorization || !req.headers.authorization) throw (new Error('you are not logged in'))
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
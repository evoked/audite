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
        /* Checking server-side if login details are satisfied in order to continue with request 
         - stops users from using POST to make weird accounts */
        if (!username || !password) throw (new Error('account details not satisfied'))

        const user = await User.find({username: username, password: password})
        /* If no returned users from (.find), then array user will be empty array */
        if(user.length < 1) throw (new Error('user not found'))

        const token = jwt.sign({data: user[0]._id}, process.env.ACCESS_TOKEN_SECRET)
        req.session.authorization = `Bearer ${token}`
        res.status(201).send({token: token, success: `logged in as ${user[0].username}`})
        return
    } catch (e) {
        return res.status(404).send({error  : `${e}`})
    }
}

module.exports.authenticateToken = async (req, res, next) => {
    try {
        const auth = req.headers.authorization

        const token = auth.split(' ')[1]
        if(token === "null" || token.length < 5) throw (new Error('no auth'))
        console.log(`token success` + token)
        let {data} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        await User.findById(data, (err, user) => {
            if(!user) throw(new Error('user not found, token invalid'))
            res.locals.user = user
        })
        
        return next()
    } catch (e) {
        return res.status(400).send(e)
    }
}

module.exports.logout = async (req, res) => {
    try {
        // console.log(`${res.locals} ${req.session.authorization}`)
        if (!req.session.authorization) throw (new Error('you are not logged in'))
        res.locals.user = null
        req.session.authorization = null
        res.status(200).json({message: 'you are now logged out'})
    } catch (e) {
        res.status(401).json({error: e})
    }
}
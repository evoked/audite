import User from '../models/UserSchema.model'
import jwt from 'jsonwebtoken'

/**
 * Create new user based on user input from front-end.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {int, string} {status, message}
 */

 module.exports.register = async (req, res) => {
    try {
        // var privateKey = "31232451"
        // let token =  await jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
        //     console.log(token)
        // })
        let {username, email, password} = req.body
        /* If any request body parameters were left out, return with error. */
        if (!username || !email || !password) {
            return res.status(400).send({ error: `account credentials not satisfied` })
        }

        /* Using mongoDB API to return boolean whether the username or email already exist in the system. */
        const userExists = await User.exists({ username: username })
        const emailExists = await User.exists({ email: email })
        
        /*         
        If either the user or email have already been registered, return with error.
        Intentionally only list one if both are true for security reasons. 
        */ 
        if (userExists) {
            return res.status(409).send({ error: `user ${username} already exists` })
        } else if (emailExists) {
            return res.status(409).send({ error:`email ${email} already in use` })
        }

        /* Finally create new user, saved into db, returns with success */
        const user = new User({ 
            username: username,
            email: email,
            password: password
        })

        await user.save()
        return res.status(200).send({ success: `user ${username} has been created` })
    } catch(e) {
        return res.status(400).send({ error: `${e}` })
    }
}   

module.exports.login = async (req, res) => {
    // const { auth } = req.headers
    // if(!auth) return res.status(401).send({ error: `not authorized` })
    const { username, password} = req.body
    if (!username || !password) return res.status(400).send({error: `account details not satisfied`})
    console.log(username,password)
    
    const user = await User.find({username: username, password: password})
    console.log({user})
    
    if(user) {
        const token = jwt.sign({data: user[0]._id}, process.env.ACCESS_TOKEN_SECRET)
        return res.json({token: token, success: `logged in as ${user[0].username}`})
    }

    return res.status(401).send({error: `invalid details`})    
}

module.exports.authenticateToken = async (req, res, next) => {
    const auth = req.headers['authorization']
    if(!auth) return res.status(403)
    // console.log(authHeader)
    
    const token = auth.split(' ')[1]
    console.log(token)
    
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, data) => {            
            if(error) return res.status(403).send({error: `${error}`})
            console.log(data)
            return res.status(200).json({data})
            // next()
        })
    } catch (e) {
        return res.send({error: `${e}`})
    }
}

module.exports.getProfile = async (req, res) => {
    // const authHeader = req.headers['authorization']
    // if(!authHeader) return res.status(403)
    // console.log(res.locals)
    res.send(res.locals)
    

}

module.exports.decodeToken = async (token) => {

}

/**
 *  Searches database for requested username.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {int, string} {status, message}
 */

 module.exports.userByUsername = async (req, res) => {
    /* Call User model function "findOne" to search for a profile. */
    let username = req.params.username
    try {
        const user = await User.findOne({ username: username }) 
        if(user) {
            return res.status(200).send({ success: `user ${username} found`})
        } else { 
            return res.status(404).send({ error: `user ${username} not found` })
    }} catch (e) {
        return res.status(400).send({ error: `${e}` })
    }
}

/**
 * Gathers entire list of users and their id's from database, in creation order.
 * 
 * @param   {*} req 
 * @param   {*} res 
 * @param   {string} typeToPresent - TODO: ascending, descending
 * @returns {res.status, res.send} - 
 */

module.exports.userList = async (req, res) => {
    try {
        console.log(req.session)
        const list = await User.find({}, {_id: 1, username: 1})
        if(list) {            
            return res.status(200).send({ success: list })
        } else {
            return res.status(404).send({ error: `users not found` })
        }
    } catch (e) {
        return res.status(400).send({ error: `${e}`})
    }
}

/* export default { create, userByUsername, userList } */
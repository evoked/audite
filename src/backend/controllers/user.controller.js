import User from '../models/UserSchema.model'
import jwt from 'jsonwebtoken'
import { reset } from 'nodemon'

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

/**
 * zzz
 * @param {*} req 
 * @param {*} res 
 * @returns {token, message} returns JWT token
 */
module.exports.login = async (req, res) => {
    // const { auth } = req.headers
    // if(!auth) return res.status(401).send({ error: `not authorized` })#
    
    const { username, password} = req.body

    if (!username || !password) return res.status(400).send({error: `account details not satisfied`})
    
    try {
        const user = await User.find({username: username, password: password})
    
        if(user) {
            const token = jwt.sign({data: user[0]._id}, process.env.ACCESS_TOKEN_SECRET)
            // req.headers.authorization = `Bearer ${token}`
            // req.locals.auth = `Bearer ${token}`
            req.session.authorization = `Bearer ${token}`
            res.status(201).send({token: token, success: `logged in as ${user[0].username}`})
            return
        }
    } catch (e) {
        
    }
    

    return res.status(401).send({error: `invalid details`})    
}

module.exports.authenticateToken = async (req, res, next) => {
    try {
        if(!req.session.authorization) throw(new Error('no auth'))
        const auth = req.session.authorization
    
        const token = auth.split(' ')[1]
        let {data} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        await User.findById(data, (err, user) => {
            if(!user) throw(new Error('user not found, token invalid'))
            res.locals.user = user
        })
        
        return next()
    } catch (e) {
        return res.send({error: `${e}`})
    }
}

module.exports.getProfile = async (req, res) => {
    // if(!res.locals.user) res.status(302).redirect('/')
    if(!req.session.authorization || !res.locals.user) throw(new Error('no auth'))

    let user = res.locals.user
    
    try {
        if(!user) {
            throw (new Error('user not found'))
        }
        return res.status(201).send({user: user})
    } catch (e) {
        return res.status(403).send({error: e})
    }
    

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
    try {
        await User.findOne({ username: req.params.username }, (err, user) => {
            if (user == null) {
                return res.status(404).send({error: `${req.params.username} not found`})
            }
            let {username, _id, created} = user
            return res.status(200).send({ success: {username, _id, created}})
        })
    } catch (e) {
        return res.status(400).send({ error: `${e}` })
    }
}

module.exports.userById = async (req, res) => {
    let id = req.params.username
    try {
        await User.findById(id,(err, user) => {
            if (err) return console.log(`${err} hello`)
            return res.status(200).send({success: {user}})
        })
    } catch (e) {
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
    let count = 0
    try {
        console.log(req.session)
        const list = await User.find({}, 
            {_id: 1, username: 1, created: 1}, (err, users) => {
                for(let user in users) {
                    count++
                }
        })
        if(list) {            
            return res.status(200).send({ success: {count, list} })
        } else {
            return res.status(404).send({ error: `users not found` })
        }
    } catch (e) {
        return res.status(400).send({ error: `${e}`})
    }
}

/* export default { create, userByUsername, userList } */
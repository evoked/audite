import User from '../models/UserSchema.model'
import Post from '../models/PostSchema.model'

/**
 * Create new user based on user input from front-end.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {int, string} {status, message}
 */

 module.exports.register = async (req, res) => {
    try {
        console.log(req.body)
        let {username, email, password} = req.body
        /* If any request body parameters were left out, return with error. */
        if (!username || !email || !password) {
            throw new Error(`account credentials not satisfied`)
        }

        /* Using mongoDB API to return boolean whether the username or email already exist in the system. */
        const userExists = await User.exists({ username: username })
        const emailExists = await User.exists({ email: email })

        /*         
        If either the user or email have already been registered, return with error.
            -  only list one if both are true for security reasons. 
        */ 
        if (userExists) {
            throw new Error(`user ${username} already exists`)
        } else if (emailExists) {
            throw new Error(`email ${email} already in use`)
        }

        /* Finally create new user, saved into db, returns with success */
        const user = new User({ 
            username: username,
            email: email,
            password: password
        })

        console.log(`user ${username} successfully created @ ${req.connection.remoteAddress}`)
        await user.save()
        return res.status(200).send(`user ${username} has been created`)
        } catch (e) {
            console.log(e)
            return res.status(400).json({error: e.message})
        }
}

module.exports.getSettings = async (req, res) => {
    if(!req.headers.authorization) throw(new Error('no auth'))
    let user = res.locals.user

    try {
        if(!user) {
            throw (new Error('user not found'))
        }
        return res.status(201).json({user: user})
    } catch (e) {
        console.log(e)
        return res.status(401).send(e)
    }
}

module.exports.getProfile = async (req, res) => {
    const { username } = req.params
    console.log(req.params)
    try {
        await User.findOne({username: username}).populate('posts')
            .exec((err, user) => {
                if(!user) return res.status(404).send({error: 'user not found'})
                let {password, email, __v, ...parsedUser} = user.toObject()

                return res.status(200).send(parsedUser)
            })
    } catch (e) {
        console.log(e)
        return res.status(404).send(e.message)
    }
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
        return res.status(400).send(`${e}` )
    }
}

module.exports.userById = async (req, res) => {
    let id = req.params.username
    try {
        await User.findById(id,(err, user) => {
            if (err) throw (new Error(`${id} not found`))
            return res.status(200).send({success: {user}})
        })
    } catch (e) {
        return res.status(400).send(`${e}`)
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
        const list = await User.find({}, 
            {_id: 1, username: 1, created: 1, posts: 1}, (err, users) => {
                // eslint-disable-next-line no-unused-vars
                for(let user in users) {
                    count++
                }
        })
        if(list) {            
            return res.status(200).send({list})
        } else {
            return res.status(404).send({ error: `users not found` })
        }
    } catch (e) {
        return res.status(400).send({ error: `${e}`})
    }
}

module.exports.delete = async (req, res) => {
    if(!req.headers.authorization) throw(new Error('no auth'))

    let user = res.locals.user
    console.log(user)
    
    try {
        if(!user) {
            throw (new Error('user not found'))
        }

        await User.deleteOne({_id: user._id}, (err) => {
            if (err) throw new Error('could not delete user')
        }).catch(err => {
            if (err) throw new Error('could not')
        })

        await Post.deleteMany({author: user._id}, (err) => {
                if (err) throw new Error('could not delete posts')
        }).catch(err => {
            if (err) throw new Error('could not')
        })
        console.log(user.username + 'has been deleted')
        return res.status(200).send({message: 'user deleted'})
    } catch (e) {
        return res.status(401).send(e.message)
    }
}

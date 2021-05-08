// import App from './App';
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import bodyParser from 'body-parser'
const mongooseStore = require('connect-mongo')

import UserSchema from './backend/models/UserSchema.model'
const { getProfile, authenticateToken, login, register, userByUsername, userList } = require('./backend/controllers/user.controller')
require("dotenv").config();
import React from 'react'
import MongoStore from 'connect-mongo'
const app = express()
app.use(express.urlencoded())
app.use(express.json())

const PORT = process.env.PORT || 3002

// app.use(cors())

const uri = `mongodb+srv://js:3213215@merncluster.eacb3.mongodb.net/audite?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })

// const connection = mongoose.createConnection(uri)

// const sessionStore = new mongooseStore({mongooseConnection: connection, collection: 'sessions'})

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: mongooseStore.create({mongoUrl: uri, mongoOptions: options}),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  },

}))

app.get('/', (req, res) => {
    res.send(`audite`)
    console.log(req.session)
    
    console.log(JSON.stringify(req.headers));
})

app.post('/register', register)
app.get('/user/:username', userByUsername)
app.get('/users', userList)
app.post('/login', login
// , (req,res) => { 
//   res.redirect('/home')
// }
)

app.post('/api/forbidden', authenticateToken)

app.get('/profile', authenticateToken, getProfile)

// app.post('/login', (req, res) => {
// })

// app.route('/api/users').get(users)

// app.listen(3001, () => console.log('server running...'))


// ReactDOM.render(
//   document.getElementById('root')
// );
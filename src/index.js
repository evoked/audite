// import App from './App';
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
// import React from 'react'
import cors from 'cors'
import path from 'path'
import UserSchema from './backend/models/UserSchema.model'
import userController from './backend/controllers/user.controller'
import authController from './backend/controllers/authentication.controller'
// import multer from 'multer'

require("dotenv").config();
// const { getProfile, authenticateToken, login, register, userByUsername, userList, userById } = require('./backend/controllers/user.controller')

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
// app.use(multer)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

const PORT = process.env.PORT || 3001
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

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: uri, mongoOptions: options}),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

app.get('/', (req, res) => {
    res.send(`audite`)
    console.log(req.session)
})

app.post('/register', userController.register)
app.get('/login', (req, res) => {
  res.render('login.html')
})
app.post('/login', authController.login)
app.get('/logout', authController.logout)
app.get('/users', userController.userList)
app.get('/user/:username', userController.userByUsername)

// app.post('/api/forbidden', userController.authenticateToken)

app.get('/profile', authController.authenticateToken, userController.getProfile)

// app.all('*', function(req, res) {
//   res.redirect('/login');
// });

// app.post('/login', (req, res) => {
// })

// app.route('/api/users').get(users)

// app.listen(3001, () => console.log('server running...'))


// ReactDOM.render(
//   document.getElementById('root')
// );
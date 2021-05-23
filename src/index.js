import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import path from 'path'
import { handler404 } from './backend/middleware/handler.js'

import UserSchema from './backend/models/UserSchema.model'
import userController from './backend/controllers/user.controller'
import authController from './backend/controllers/authentication.controller'
import postController from "./backend/controllers/posts.controller";
// import multer from 'multer'

require("dotenv").config();

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
// app.use(multer)

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*, http://gdata.youtube.com/");
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
app.get('/login')
app.post('/login', authController.login)
app.get('/logout', authController.logout)
app.get('/users', userController.userList)
app.get('/user/:username', userController.getForeignProfile)
app.get('/settings', authController.authenticateToken, userController.getSettings)
// app.post('/api/forbidden', userController.authenticateToken)
app.post('/post/new', authController.authenticateToken, postController.createPost)

app.post('/profile/deleteUser', authController.authenticateToken, userController.userDelete)
app.get('/post/new', (req,res) => {
  res.send('hi')
})

// app.get('*', handler404)

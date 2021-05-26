import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'

import UserSchema from './backend/models/UserSchema.model'
import userController from './backend/controllers/user.controller'
import authController from './backend/controllers/authentication.controller'
import postController from "./backend/controllers/posts.controller";

require("dotenv").config();

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

const PORT = process.env.PORT || 3001
const uri = `mongodb+srv://${process.env.MONGO}@merncluster.eacb3.mongodb.net/audite?retryWrites=true&w=majority`
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

/* Login/register routing */
app.post('/register', userController.register)
app.post('/login', authController.login)
app.get('/logout', authController.logout)

/* User call routing */
app.get('/users', userController.userList)
app.get('/user/:username', userController.getProfile)
app.get('/user/id/:id', userController.userById)

/* Local user settings' routing with authentication */
app.get('/settings', authController.authenticateToken, userController.getSettings)
app.post('/settings/delete', authController.authenticateToken, userController.delete)

/* Local user post routing with authentication */
app.post('/post/new', authController.authenticateToken, postController.create)
app.post('/post/delete', authController.authenticateToken, postController.delete)

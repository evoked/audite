import React from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import UsersList from './components/Users.js'
import Profile from './components/Profile.js'
import UserLogin from './components/UserLogin.js'
import NavUser from './components/Nav/NavUser.js'
import UserRegister from './components/UserRegister.js'
import CreatePost from './components/CreatePost.js'
import RenderUser from './components/RenderUser.js'

class App extends React.Component {
  render() {
    return (
      <div className="App">
          <NavUser />
          <Switch>
            <Route path="/settings" component={Profile} />
            <Route path="/user" component={UsersList} />
            <Route path="/users" component={UsersList} />
            <Route path="/login" component={UserLogin} />
            <Route path="/logout" />
            <Route path="/register" component={UserRegister} />
            <Route path="/post/new" component={CreatePost} />
            <Route path="/:username" component={RenderUser}/>
            <Route path="*" ><p className="pageNotFound">404: not found</p></Route>
        </Switch>
      </div>
    )
  }
}

export default App;
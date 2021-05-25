import React from 'react'
import {
  Switch,
  Route,
} from "react-router-dom"
import UsersList from './components/Users.js'
import Settings from './components/Settings.js'
import UserLogin from './components/UserLogin.js'
import NavUser from './components/Nav/NavUser.js'
import UserRegister from './components/UserRegister.js'
import CreatePost from './components/UserHome/CreatePost.js'
import RenderUser from './components/User/RenderUser.js'
import UserHome from './components/UserHome/UserHome.js'

class App extends React.Component {
  render() {
    return (
      <div className="App">
          <NavUser />
          <Switch>
            <Route exact path="/" component={UserLogin}/>
            <Route path="/home" component={UserHome}/>
            <Route path="/settings" component={Settings} />
            <Route path="/user" component={UsersList} />
            <Route path="/users" component={UsersList} />
            <Route path="/register" component={UserRegister} />
            <Route path="/post/new" component={CreatePost} />
            <Route path="/:username/:pageId" component={RenderUser}/>
            <Route path="*" ><p className="pageNotFound">404: not found</p></Route>
        </Switch>
      </div>
    )
  }
}

export default App;

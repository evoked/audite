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

// let URL = process.env.SESSION_URL + process.env.SESSION_PORT
// {!localStorage.getItem('token') ? 
            // <Route path="/register">
            //   <UserRegister />
            // </Route> 
            // : <Route path="/logout">
            //     {localStorage.clear()}
            //   </Route>}
class App extends React.Component {
  render() {
    return (
      <div className="App">
          <nav>
            <Link to="/">Home </Link>
            <Link to="/profile"> Profile </Link>
            <Link to="/users"> Users </Link>
            <Link to="/login"> Login</Link>
          </nav>

          <Switch>
            <Route exact path="/">
              <p>hi</p>
            </Route>
            <Route path="/profile" component={Profile} />
            <Route path="/users" component={UsersList} />
            <Route path="/login" component={UserLogin} />
        </Switch>
      </div>
    );
  }
}

export default App;
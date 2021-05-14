import React, { Component } from 'react';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UsersList from './components/Users.js'

// let URL = process.env.SESSION_URL + process.env.SESSION_PORT

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/users">
            <UsersList />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
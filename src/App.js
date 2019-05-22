import React from 'react';
import Login from './Login.js'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import './App.css';

export default class App extends React.Component {
  state = {
    loggedIn: false
  }
  render() {
    return (
      <Route exact path="/" render={() => (
        this.state.loggedIn ? (
          <Redirect to="/dashboard" />
        ) : (
            <Login />
          )
      )} />
      );
  }
}
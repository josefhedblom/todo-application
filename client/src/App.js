import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Redirect } from 'react-router'


// import Todo from "./components/todos/Todo";

import Login from './components/login/Login';
import Register from './components/register/Register';
import './App.css';
import todosComp from './components/todos/todosComp';
import { useState } from "react";

function App() {
  // const state = {
  //   loggedIn: false,
  // };
  

  const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          return loggedIn ? (
            <Comp {...props} />) : (
            <Redirect to={{
              pathname: "/",
              state: {
                prevLocation: path,
                error: "you need to log in first"
              },
            }}
            />
          );
        }}
      />
    );
  };

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={todosComp} render={(props) => {}}/>
        {/* <ProtectedRoute
          path="/"
          loggedIn={this.state.loggedIn}
          component={todosComp} 
        />*/}
      </Switch>
    </Router>
  );
}

export default App;

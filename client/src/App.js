import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Redirect } from 'react-router'

import Login from './components/login/Login';
import Register from './components/register/Register';
import './App.css';
import todosComp from './components/todos/todosComp';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/todos" component={todosComp} />
      </Switch>
    </Router>
  );
}

export default App;

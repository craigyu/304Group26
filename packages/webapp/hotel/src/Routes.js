import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import history from './history'
import Register from './components/Register'
import RegisterAccount from './components/RegisterAccount'


function Routes() {
  return (
    <Router history={history}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/register_account" exact component={RegisterAccount} />
    </Switch>
    </Router>
  );
}

export default Routes;
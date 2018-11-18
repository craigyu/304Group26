import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import history from './history'


function Routes() {
  return (
    <Router history={history}>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
    </Router>
  );
}

export default Routes;
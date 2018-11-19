import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import history from './history'
import Register from './components/Register'
import RegisterAccount from './components/RegisterAccount'
import Login from './components/Login'
import Customer from './components/Customer'
import Employee from './components/Employee'
import Booking from './components/Booking'
import AllReserve from './components/AllReserve'


function Routes() {
  return (
    <Router history={history}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/register_account" exact component={RegisterAccount} />
      <Route path="/login" exact component={Login} />
      <Route path="/customer" exact component={Customer} />
      <Route path="/employee" exact component={Employee} />
      <Route path="/booking" exact component={Booking} />
      <Route path="/all_reserve" exact component={AllReserve} />
    </Switch>
    </Router>
  );
}

export default Routes;
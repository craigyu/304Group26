import React, {Component} from 'react';
import Routes from './Routes.js';
import {PageHeader} from 'react-bootstrap';
import NavBar from './components/Navbar'
import {Provider} from "react-redux";
import {createStore, combineReducers} from 'redux'
import registerReducer from './components/Register/reducer'
import {combineForms} from 'react-redux-form';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'react-table/react-table.css'


const initialCustomer = {
  first_name: '',
  last_name: '',
  email: '',
  address: '',
  password:'',
  expire_month: '',
  expire_year: '',
  card_number: '',
  cvc: '',
  payment_method: '',
};

const initialEmployee = {
  first_name: '',
  last_name: '',
  email: '',
  address: '',
  password:'',
  position: '',
  hotel_id: '',
  wage: '',
};

const initialBooking = {
  hotel_id: '',
  room_id: '',
  num_guests: 0,
  has_breakfast: false,
};

const reducer = combineReducers({
  registerReducer,
  customerForm: combineForms({
    customerForm: initialCustomer,
  }, 'customerForm'),
  employeeForm: combineForms({
    employeeForm: initialEmployee,
  }, 'employeeForm'),
  bookForm: combineForms({
    bookForm: initialBooking,
  }, 'bookForm'),
});
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <NavBar/>
            <Routes/>
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;

import React, {Component} from "react";
import {Button} from 'react-bootstrap';
import history from '../../history';
import styles from './styles.scss';
import {connect} from 'react-redux';
import {isCustomerSelector} from './selector'
import { Control, Form } from 'react-redux-form';
import api from '../../api';
const axios = require('axios');


class RegisterAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {is_customer: null, hotel: null};
    this.regCustomer = this.regCustomer.bind(this);
    this.regEmployee = this.regEmployee.bind(this);
  }

  componentDidMount() {
    const is_customer = this.props.is_customer;
    this.setState({is_customer});
    let that = this;
    if(!is_customer){
      let header = {
        headers: {
          'Content-Type': 'application/json'
        },
      };
      axios.get(api.hotel, header)
        .then(function (response) {
          // handle success
          const data = response.data;
          that.setState({hotel: data});
        })
        .catch(function (error) {
          // handle error
          alert(error);
          console.error(error);
        })

    }
  }

  regCustomer(form, user_id, header){
    let customerForm = {
      user_id: user_id,
      expire_month: form.expire_month,
      expire_year: form.expire_year,
      card_number: form.card_number,
      cvc: form.cvc,
      payment_method: form.payment_method,
    };
    axios.post(api.customer, customerForm, header).then(()=>{
      localStorage.setItem('isAuthenticated', 'true');
      alert("customer created");
      history.push('/customer');
    }).catch((err)=>{
      console.error(err);
      alert(JSON.stringify(err));
    })
  }

  regEmployee(form, user_id, header){
    let employeeForm = {
      user_id: user_id,
      hotel_id: form.hotel_id,
      position: form.position,
      wage: parseFloat(form.wage),
    };
    axios.post(api.employee, employeeForm, header).then(()=>{
      localStorage.setItem('isAuthenticated', 'true');
      alert("employee created");
      history.push('/employee');
    }).catch((err)=>{
      console.error(err);
      alert(JSON.stringify(err));
    })
  }

  handleSubmit(form, is_customer){
    let userFrom = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      address: form.address,
      password: form.password,
      is_customer: is_customer,
    };
    let header = {
      headers: {
        'Content-Type': 'application/json'
      },
    };
    let that = this;
    axios.post(api.user, userFrom, header).then((res)=>{
      if(res.data){
        console.log(res);
        localStorage.setItem('user_id', res.data.id);
        if(is_customer){
          that.regCustomer(form, res.data.id, header);
        }else{
          that.regEmployee(form, res.data.id, header);
        }
      }
    }).catch((err)=>{
      console.error(err);
      alert(JSON.stringify(err));
    })
  }


  render() {
    let is_customer = this.props.is_customer;
    return (
      <div className="default-container">
        {is_customer &&
        <div style={{marginTop: '5%'}}>
          <h2>Register a customer account</h2>
          <Form model="customerForm" onSubmit={(val) => this.handleSubmit(val.customerForm, true)}>
            <div className={styles.labelContainer}>
              <label>First Name</label>
              <Control.text model=".customerForm.first_name" validators={{required: (val) => val.length}}  />
            </div>
            <div className={styles.labelContainer}>
              <label>Last Name</label>
              <Control.text model=".customerForm.last_name" validators={{required: (val) => val.length}}  />
            </div>
            <div className={styles.labelContainer}>
              <label>Email</label>
              <Control.text model=".customerForm.email" validators={{required: (val) => val.length}}  />
            </div>
            <div className={styles.labelContainer}>
              <label>Password</label>
              <Control.text model=".customerForm.password" validators={{required: (val) => val.length}}  />
            </div>
            <div className={styles.labelContainer}>
              <label>Address</label>
              <Control.text model=".customerForm.address"  />
            </div>
            <div className={styles.selectContainer}>
              <label>Payment Method</label>
              <Control.select model=".customerForm.payment_method" defaultValue="visa">
                <option value='visa'>Visa</option>
                <option value='mastercard'>Mastercard</option>
                <option value='american express'>American Express</option>
              </Control.select>
            </div>
            <div className={styles.labelContainer}>
              <label>Card number</label>
              <Control.text model=".customerForm.card_number" validators={{required: (val) => val.length}}  />
            </div>
            <div className={styles.labelContainer}>
              <label>Expire Month</label>
              <Control.text model=".customerForm.expire_month" validators={{required: (val) => val.length}}  />
            </div>
            <div className={styles.labelContainer}>
              <label>Expire Year</label>
              <Control.text model=".customerForm.expire_year" validators={{required: (val) => val.length}}  />
            </div>
            <div className={styles.labelContainer}>
              <label>CVC</label>
              <Control.text model=".customerForm.cvc" validators={{required: (val) => val.length}}  />
            </div>
            <Button type='submit' bsStyle='primary'>Save</Button>
          </Form>
        </div>

        }
        {!is_customer &&
        <div style={{marginTop: '5%'}}>
          <h2>Register an employee account</h2>
          <Form model="employeeForm" onSubmit={(val) => this.handleSubmit(val.employeeForm, false)}>
            <div className={styles.labelContainer}>
              <label>First Name</label>
              <Control.text model=".employeeForm.first_name" validators={{required: (val) => val.length}}  />
            </div>
            <div className={styles.labelContainer}>
              <label>Last Name</label>
              <Control.text model=".employeeForm.last_name" validators={{required: (val) => val.length}}  />
            </div>
            <div className={styles.labelContainer}>
              <label>Email</label>
              <Control.text model=".employeeForm.email" validators={{required: (val) => val.length}}  />
            </div>
            <div className={styles.labelContainer}>
              <label>Password</label>
              <Control.text model=".employeeForm.password" validators={{required: (val) => val.length}}  />
            </div>
            <div className={styles.labelContainer}>
              <label>Address</label>
              <Control.text model=".employeeForm.address"  />
            </div>
            <div className={styles.labelContainer}>
              <label>Wage</label>
              <Control.text model=".employeeForm.wage" validators={{required: (val) => val.length}}  />
            </div>
            {this.state.hotel &&
            <div className={styles.selectContainer}>
              <label>Hotel branch</label>
              <Control.select model=".employeeForm.hotel_id" defaultValue={this.state.hotel[0].hotel_id}>
                {
                   this.state.hotel.map((h)=>{
                    return <option key={h.hotel_id}  value={h.hotel_id}>{h.name}</option>
                  })
                }
              </Control.select>
            </div>
            }
            <div className={styles.selectContainer}>
              <label>Position</label>
              <Control.select model=".employeeForm.position" defaultValue="Clerk">
                <option value='Clerk'>Clerk</option>
                <option value='Cleaner'>Cleaner</option>
                <option value='Receptionist'>Receptionist</option>
                <option value='Concierge'>Concierge</option>
                <option value='Chef'>Chef</option>
                <option value='Shift Leader'>Shift Leader</option>
                <option value='Valet'>Valet</option>
              </Control.select>
            </div>

            <Button type='submit' bsStyle='primary'>Save</Button>
          </Form>
        </div>
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    is_customer: isCustomerSelector(state)
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterAccount);

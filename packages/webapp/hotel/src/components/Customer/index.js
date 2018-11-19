import React, { Component } from "react";
import styles from  './styles.scss';
import history from '../../history';
import api from '../../api';
import { Control, Form } from 'react-redux-form';
import {Button} from 'react-bootstrap';

const axios = require('axios');

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {user_id: null, account_info: null, customer_info: null};
    this.getCustomer = this.getCustomer.bind(this);
    this.getAccount = this.getAccount.bind(this);

  }

  getAccount(user_id){
    let that = this;
    axios.get(api.user + '/' + user_id, api.headers).then((res)=>{
      if(res.data && res.data.length > 0){
        that.setState({
          account_info: res.data[0]
        });
      }else{
        alert('failed to retreive customer')
      }

    }).catch((err)=>{
      console.error(err);
      alert(JSON.stringify(err));
    })
  }

  getCustomer(user_id){
    let that = this;
    axios.get(api.customer + '/' + user_id, api.headers).then((res)=>{
      if(res.data && res.data.length > 0){
        that.setState({
          customer_info: res.data[0]
        });
      }else{
        alert('failed to retreive customer')
      }

    }).catch((err)=>{
      console.error(err);
      alert(JSON.stringify(err));
    })
  }

  componentDidMount(){
    // if(localStorage.getItem('isAuthenticated') !== 'true'){
    //   history.push('/')
    // }
    const user_id = localStorage.getItem('user_id');
    if(user_id){
      this.setState({user_id});
      this.getCustomer(user_id);
      this.getAccount(user_id);
    }
  }

  handleSubmit(form, is_customer){
    console.log(form);
  }



  render() {
    let {customer_info, account_info} = this.state;
    return (
      <div className="default-container" style={{paddingTop: '5%'}}>
        {this.state.user_id && account_info && customer_info &&
        <Form model="customerForm" onSubmit={(val) => this.handleSubmit(val.customerForm, true)}>
          <div className={styles.labelContainer}>
            <label>First Name</label>
            <Control.text model=".customerForm.first_name" validators={{required: (val) => val.length}}  defaultValue={account_info.first_name}/>
          </div>
          <div className={styles.labelContainer}>
            <label>Last Name</label>
            <Control.text model=".customerForm.last_name" validators={{required: (val) => val.length}} defaultValue={account_info.last_name} />
          </div>
          <div className={styles.labelContainer}>
            <label>Email</label>
            <Control.text model=".customerForm.email" validators={{required: (val) => val.length}}  defaultValue={account_info.email}/>
          </div>
          <div className={styles.labelContainer}>
            <label>Password</label>
            <Control.text model=".customerForm.password" validators={{required: (val) => val.length}} defaultValue={account_info.password} />
          </div>
          <div className={styles.labelContainer}>
            <label>Address</label>
            <Control.text model=".customerForm.address" defaultValue={account_info.address} />
          </div>
          <div className={styles.selectContainer}>
            <label>Payment Method</label>
            <Control.select model=".customerForm.payment_method" defaultValue={customer_info.payment_method}>
              <option value='visa'>Visa</option>
              <option value='mastercard'>Mastercard</option>
              <option value='american express'>American Express</option>
            </Control.select>
          </div>
          <div className={styles.labelContainer}>
            <label>Card number</label>
            <Control.text model=".customerForm.card_number" validators={{required: (val) => val.length}} defaultValue={customer_info.card_number} />
          </div>
          <div className={styles.labelContainer}>
            <label>Expire Month</label>
            <Control.text model=".customerForm.expire_month" validators={{required: (val) => val.length}} defaultValue={customer_info.expire_month} />
          </div>
          <div className={styles.labelContainer}>
            <label>Expire Year</label>
            <Control.text model=".customerForm.expire_year" validators={{required: (val) => val.length}} defaultValue={customer_info.expire_year} />
          </div>
          <div className={styles.labelContainer}>
            <label>CVC</label>
            <Control.text model=".customerForm.cvc" validators={{required: (val) => val.length}} defaultValue={customer_info.cvc} />
          </div>
          <Button type='submit' bsStyle='primary'>Update</Button>
        </Form>
        }
        {(!this.state.user_id  || !this.state.customer_info || !this.state.account_info) &&
        <div>
          no id
        </div>
        }
      </div>

    );
  }
}


export default Customer;

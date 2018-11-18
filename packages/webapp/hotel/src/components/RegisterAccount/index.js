import React, {Component} from "react";
import {Button} from 'react-bootstrap';
import history from '../../history';
import styles from './styles.scss';
import {connect} from 'react-redux';
import {isCustomerSelector} from './selector'
import { Control, Form } from 'react-redux-form';


class RegisterAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {is_customer: null};

  }

  componentDidMount() {
    const is_customer = this.props.is_customer;
    this.setState({is_customer});


  }

  handleSubmit(customerForm, user){
    console.log(customerForm);
  }


  render() {
    let is_customer = this.state.is_customer;
    return (
      <div className="default-container">
        {is_customer &&
        <div style={{marginTop: '5%'}}>
          <h2>Register a customer account</h2>
          <Form model="customerForm" onSubmit={(val) => this.handleSubmit(val.customerForm, this.state.customerForm)}>
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
          <Form model="employeeForm" onSubmit={(val) => this.handleSubmit(val.employeeForm, this.state.employeeForm)}>
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

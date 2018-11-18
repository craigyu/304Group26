import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import history from '../../history';
import styles from  './styles.scss';
import customerImg from '../../assets/img/customer.png';
import { connect } from 'react-redux';
import employeeImg from '../../assets/img/employee.png';
import {setIsCustomer} from './action'


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { is_customer: null };
    this.registerAccount = this.registerAccount.bind(this);
    this.appendItem = this.appendItem.bind(this);
  }

  componentDidMount(){
    // if(localStorage.getItem('isAuthenticated') !== 'true'){
    //   history.push('/')
    // }
  }

   appendItem = (is_customer) => new Promise((resolve, reject) => {
    // do anything here
    this.props.dispatch(setIsCustomer(is_customer));
    resolve();
  });

  registerAccount(is_customer){
   this.appendItem(is_customer).then(()=>{
     history.push('/register_account')
   })
  }



  render() {
    return (
      <div className="default-container">
        <h2>Choose a type of the account</h2>
       <div className={styles.typeContainer}>
         <div className={styles.blockContainer} onClick={() => this.registerAccount(true)}>
            <img src={customerImg}/>
           <h3>Customer</h3>
         </div>
         <div className={styles.blockContainer} onClick={() => this.registerAccount(false)}>
           <img src={employeeImg}/>
           <h3>Employee</h3>
         </div>
       </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
};


export default connect(mapDispatchToProps)(Register);
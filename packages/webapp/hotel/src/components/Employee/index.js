import React, { Component } from "react";
import styles from  './styles.scss';
import history from '../../history';
import api from '../../api';
import { Control, Form } from 'react-redux-form';
import {Button} from 'react-bootstrap';

const axios = require('axios');

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {user_id: null, account_info: null, employee_info: null};
    this.getEmployee = this.getEmployee.bind(this);
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

  getEmployee(user_id){
    let that = this;
    axios.get(api.employee + '/' + user_id, api.headers).then((res)=>{
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
      axios.get(api.employee + '/' + user_id, api.headers).then((res)=>{
        if(res.data && res.data.length > 0){
          this.setState({
            info: res.data[0]
          });
        }else{
          alert('failed to retreive employee')
        }

      }).catch((err)=>{
        console.error(err);
        alert(JSON.stringify(err));
      })

    }
  }



  render() {
    let {account_info, employee_info} = this.state;
    return (
      <div className="default-container" style={{paddingTop: '5%'}}>
        {this.state.user_id && account_info&& employee_info &&
        <div>
          has userid
        </div>
        }
        {(!this.state.user_id  || !account_info || !employee_info) &&
        <div>
          no id
        </div>
        }
      </div>

    );
  }
}


export default Employee;

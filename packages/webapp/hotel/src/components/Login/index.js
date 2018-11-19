import React, { Component } from "react";
import styles from  './styles.scss';
import history from '../../history'
import {Button} from 'react-bootstrap';
import api from '../../api';

const axios = require('axios');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.changePassword = this.changePassword.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  componentDidMount(){
    // if(localStorage.getItem('isAuthenticated') !== 'true'){
    //   history.push('/')
    // }
  }
  changeEmail(event){
    const value = event.target.value;
    this.setState({
      email: value,
    })
  }

  changePassword(event){
    const value = event.target.value;
    this.setState({
      password: value
    })
  }

  logIn(info){
    localStorage.setItem('user_id', info.id);
    localStorage.setItem('isAuthenticated', 'true');
    if(info.is_customer){
      history.push('/customer')
    }else{
      history.push('/employee')
    }
  }


  verifyLogin(){
    const {email, password} = this.state;
    if(email === '' || password === ''){
      alert('please enter your email and password');
      return
    }
    axios.get(api.user + '/email/' + email, api.headers).then((res)=>{
      if(res.data && res.data.length > 0){
        let userInfo = res.data[0];
        if(password !== userInfo.password){
          alert('Wrong password');
        }else{
          this.logIn(userInfo);
        }
      }else if(res.data && res.data.length === 0){
        alert('user not found');
      }

    }).catch((err)=>{
      console.error(err);
      alert(JSON.stringify(err));
    })

  }

  render() {
    return (
      <div className="default-container" style={{paddingTop: '5%'}}>
        <div className={styles.inputContainer} onChange={(event) => this.changeEmail(event)}>
          <p>Email:</p>
          <input type="text"/>
        </div>
        <div className={styles.inputContainer} onChange={(event) => this.changePassword(event)}>
          <p>Password:</p>
          <input type="text"/>
        </div>
        <Button bsStyle="default" style={{width: '20%', margin: '5% auto 0 auto'}} onClick={()=>this.verifyLogin()} >Login</Button>
      </div>
    );
  }
}


export default Login;

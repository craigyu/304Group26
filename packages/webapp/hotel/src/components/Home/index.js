import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import styles from  './styles.scss';
import backGroundImg from '../../assets/img/background.jpg';
import history from '../../history';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.goRegister = this.goRegister.bind(this);
  }

  componentDidMount(){
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if(isAuthenticated){
      if(isAuthenticated === 'true'){
        this.setState({
          isAuthenticated: true,
        })
      }
    }

  }

  goRegister(){
    history.push('/register');
  }

  login(){
    history.push('/login')
  }

  logout(){
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('user_id');
    this.setState({
      isAuthenticated: false,
    })
  }

  render() {
    const homeStyle = {
      width: '100%',
      height: '100vh',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundImage: `url(${backGroundImg})`,
      display: 'block',
    };
    return (
      <div style={homeStyle}>
        {!this.state.isAuthenticated &&
        <div className={styles.container}>
          <div>
            <h1>Wanderlust</h1>
            <h3>Adventure is here.</h3>
          </div>
          <div className={styles.buttonContainer}>
            <Button bsStyle="default" onClick={()=> this.login()}>Log in</Button>
            <Button bsStyle="default" onClick={()=> this.goRegister()}>Register</Button>
          </div>

        </div>
        }
        {
          this.state.isAuthenticated &&
          <div div className={styles.container}>
            <h3>logged in</h3>
            <Button bsStyle="danger" onClick={()=> this.logout()}>log out</Button>
          </div>
        }



      </div>
    );
  }
}


export default Home;

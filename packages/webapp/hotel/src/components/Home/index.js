import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import styles from  './styles.scss'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    if(localStorage.getItem('isAuthenticated') === 'true'){
      this.setState({
        isAuthenticated: true,
      })
    }
  }

  login(){
    localStorage.setItem('isAuthenticated', 'true');
    console.log('here');
    this.setState({
      isAuthenticated: true,
    })
  }

  logout(){
    localStorage.setItem('isAuthenticated', 'false');
    this.setState({
      isAuthenticated: false,
    })
  }

  render() {

    return (
      <div className={styles.container}>
        {!this.state.isAuthenticated &&
        <div>
          <h3>pleasae log in</h3>
          <Button bsStyle="primary" onClick={()=> this.login()}>log in</Button>
        </div>
        }
        {
          this.state.isAuthenticated &&
          <div>
            <h3>logged in</h3>
            <Button bsStyle="danger" onClick={()=> this.logout()}>log out</Button>
          </div>
        }



      </div>
    );
  }
}


export default Home;

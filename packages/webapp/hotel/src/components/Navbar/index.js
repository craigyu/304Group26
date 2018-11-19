import React, { Component } from "react";
import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import styles from  './styles.scss';
import history from '../../history'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.goPage = this.goPage.bind(this);
  }

  componentDidMount(){
    // if(localStorage.getItem('isAuthenticated') !== 'true'){
    //   history.push('/')
    // }
  }

  goPage(path){
    history.push(path);
  }


  render() {

    return (
      <Navbar fixedTop inverse collapseOnSelect style={{borderRadius: 0, marginBottom: 0, overflow: 'auto'}}>
        <Navbar.Header>
          <Navbar.Brand>
            <a onClick={()=>{history.push('/')}}>Puny Budapest Hotel</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} onClick={()=>this.goPage('/customer')} >
              Customer
            </NavItem>
            <NavItem eventKey={2} onClick={()=>this.goPage('/employee')} >
              Employee
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} onClick={()=>this.goPage('/booking')} >
              Book Room
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default NavBar;

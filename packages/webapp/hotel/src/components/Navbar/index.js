import React, { Component } from "react";
import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import styles from  './styles.scss';
import history from '../../history'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false };
  }

  componentDidMount(){
    // if(localStorage.getItem('isAuthenticated') !== 'true'){
    //   history.push('/')
    // }
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
            <NavItem eventKey={1} href="#">
              Link
            </NavItem>
            <NavItem eventKey={2} href="#">
              Link
            </NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              Link Right
            </NavItem>
            <NavItem eventKey={2} href="#">
              Link Right
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default NavBar;

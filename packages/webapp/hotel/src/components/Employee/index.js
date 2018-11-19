import React, { Component } from "react";
import styles from  './styles.scss';
import history from '../../history';
import api from '../../api';
import { Control, Form, actions} from 'react-redux-form';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';

const axios = require('axios');

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {user_id: null, account_info: null, employee_info: null, hotel:null};
    this.getEmployee = this.getEmployee.bind(this);
    this.getAccount = this.getAccount.bind(this);
    this.getHotel = this.getHotel.bind(this);
    this.goPage = this.goPage.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.updateCEmployee = this.updateCEmployee.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
  }

  updateAccount(form){
    let userForm = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      address: form.address,
      password: form.password,
      is_customer: false,
    };
    let that = this;
    let user_id = this.state.user_id;
    axios.put(api.user + '/' + user_id, userForm, api.headers).then((res)=>{
      if(res){
        that.updateCEmployee(form, user_id)
      }
      else{
        alert("failed to update account");
      }
    }).catch((err)=>{
      console.error(err);
      alert(JSON.stringify(err));
    })
  }


  updateCEmployee(form, user_id){
    let customerForm = {
      user_id: user_id,
      hotel_id: form.hotel_id,
      position: form.position,
      wage: parseInt(form.wage,10),
    };
    axios.put(api.employee + '/' + user_id, customerForm, api.headers).then(()=>{
      alert("employee updated");
      history.push('/employee');
    }).catch((err)=>{
      console.error(err);
      alert(JSON.stringify(err));
    })

  }

  deleteAccount(){
    if(window.confirm('Are you sure you want to delete?')){
      axios.delete(api.user + '/' + this.state.user_id, api.headers).then((res)=>{
        if(res){
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('user_id');
          alert('Deleted!');
          history.push('/');
        }
      })

    }
  }
  goPage(path){
    history.push(path);
  }
  getHotel(){
    let that = this;
    axios.get(api.hotel, api.headers)
      .then(function (response) {
        // handle success
        const data = response.data;
        that.setState({hotel: data});
      })
      .catch(function (error) {
        // handle error
        alert(JSON.stringify(error));
        console.error(error);
      })
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
          employee_info: res.data[0]
        });
        console.log(res.data[0].position);
        that.props.dispatch(actions.change('employeeForm.employeeForm.position', res.data[0].position.trim()));

      }else{
        alert('failed to retrieve employee')
      }

    }).catch((err)=>{
      console.error(err);
      //alert(JSON.stringify(err));
    })
  }

  componentDidMount(){
    // if(localStorage.getItem('isAuthenticated') !== 'true'){
    //   history.push('/')
    // }
    const user_id = localStorage.getItem('user_id');
    if(user_id){
      this.getHotel();
      this.setState({user_id});
      this.getAccount(user_id);
      this.getEmployee(user_id);
    }
  }

  handleSubmit(form){
   this.updateAccount(form);
  }

  render() {
    let {account_info, employee_info} = this.state;
    return (
      <div className="default-container" style={{paddingTop: '5%'}}>
        {this.state.user_id && account_info && employee_info &&
        <Form model="employeeForm" onSubmit={(val) => this.handleSubmit(val.employeeForm)}>
          <div className={styles.labelContainer}>
            <label>First Name</label>
            <Control.text model=".employeeForm.first_name" validators={{required: (val) => val.length}} defaultValue={account_info.first_name} />
          </div>
          <div className={styles.labelContainer}>
            <label>Last Name</label>
            <Control.text model=".employeeForm.last_name" validators={{required: (val) => val.length}}  defaultValue={account_info.last_name}/>
          </div>
          <div className={styles.labelContainer}>
            <label>Email</label>
            <Control.text model=".employeeForm.email" validators={{required: (val) => val.length}}  defaultValue={account_info.email}/>
          </div>
          <div className={styles.labelContainer}>
            <label>Password</label>
            <Control.text model=".employeeForm.password" validators={{required: (val) => val.length}}  defaultValue={account_info.password}/>
          </div>
          <div className={styles.labelContainer}>
            <label>Address</label>
            <Control.text model=".employeeForm.address" defaultValue={account_info.address} />
          </div>
          <div className={styles.labelContainer} >
            <label>Wage</label>
            <Control.text type="number" model=".employeeForm.wage"   defaultValue={employee_info.wage}/>
          </div>
          {this.state.hotel &&
          <div className={styles.selectContainer}>
            <label>Hotel branch</label>
            <Control.select model=".employeeForm.hotel_id" defaultValue={employee_info.hotel_id}>
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
            <Control.select model=".employeeForm.position">
              <option value='Clerk'>Clerk</option>
              <option value='Cleaner'>Cleaner</option>
              <option value='Receptionist'>Receptionist</option>
              <option value='Concierge'>Concierge</option>
              <option value='Chef'>Chef</option>
              <option value='Shift Leader'>Shift Leader</option>
              <option value='Valet'>Valet</option>
            </Control.select>
          </div>

          <Button type='submit' bsStyle='primary'>Update</Button>
        </Form>
        }
        <Button bsStyle="danger" bsSize="large" style={{marginTop:'30px'}} onClick={()=>this.deleteAccount()}>Delete account</Button>
        {(!this.state.user_id  || !account_info || !employee_info) &&
        <div>
          no id
        </div>
        }
        <div>
          <h3>Employee Tools</h3>
          <Button bsStyle="primary" style={{marginRight:'10px'}} onClick={()=>this.goPage('/all_reserve')}>See All Reservations</Button>
          <Button bsStyle="primary" style={{marginRight:'10px'}} onClick={()=>this.goPage('/add_amenity')}>Add a Amenity</Button>
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


export default connect(mapDispatchToProps)(Employee);

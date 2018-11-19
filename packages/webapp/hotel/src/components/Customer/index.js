import React, { Component } from "react";
import styles from  './styles.scss';
import history from '../../history';
import api from '../../api';
import { Control, Form , actions} from 'react-redux-form';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import Table from '../Table';

const axios = require('axios');

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {user_id: null, account_info: null, customer_info: null, reservations: null, hotel: null,};
    this.getCustomer = this.getCustomer.bind(this);
    this.getAccount = this.getAccount.bind(this);
    this.getReservation = this.getReservation.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
    this.getHotel = this.getHotel.bind(this);
    this.getHotelName = this.getHotelName.bind(this);
  }

  getReservation(user_id){
    let that = this;
    axios.get(api.reservation + '/user/' + user_id, api.headers).then((res)=>{
      if(res.data && res.data.length > 0){
        that.setState({
          reservations: res.data
        });
      }
    }).catch((err)=>{
      console.error(err);
      alert(JSON.stringify(err));
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

  getCustomer(user_id){
    let that = this;
    axios.get(api.customer + '/' + user_id, api.headers).then((res)=>{
      if(res.data && res.data.length > 0){
        that.setState({
          customer_info: res.data[0]
        });
        that.props.dispatch(actions.change('customerForm.customerForm.payment_method', res.data[0].payment_method.replace(/^\s+|\s+$/g, "")));
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
      this.getReservation(user_id);
      this.getHotel();
    }
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

  getHotelName(id){
    const hotels = this.state.hotel;
    for(let h of hotels){
      if (h.hotel_id ===id){
        return h.name;
      }
    }
    return 'NO HOTEL FOUND'
  }

  updateAccount(form){
    let userForm = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      address: form.address,
      password: form.password,
      is_customer: true,
    };
    let that = this;
    let user_id = this.state.user_id;
    axios.put(api.user + '/' + user_id, userForm, api.headers).then((res)=>{
      if(res){
        that.updateCustomer(form, user_id)
      }
      else{
        alert("failed to update account");
      }
    }).catch((err)=>{
      console.error(err);
      alert(JSON.stringify(err));
    })
  }


  updateCustomer(form, user_id){
    let customerForm = {
      user_id: user_id,
      expire_month: form.expire_month,
      expire_year: form.expire_year,
      card_number: form.card_number,
      cvc: form.cvc,
      payment_method: form.payment_method,
    };
    axios.put(api.customer + '/' + user_id, customerForm, api.headers).then(()=>{
      alert("customer updated");
      history.push('/customer');
    }).catch((err)=>{
      console.error(err);
      alert(JSON.stringify(err));
    })

  }

  handleSubmit(form){
    this.updateAccount(form);
  }



  render() {
    const columns = [{
      id: 'date',
      Header: 'Check in',
      accessor: d => d.check_in_date.slice(0, 10),
      minWidth: 80
    }, {
      id: 'outDaate',
      Header: 'Check out',
      accessor: d =>  d.check_out_date.slice(0, 10),
      minWidth: 80
    }, {
      id: 'num_guests',
      Header: 'Guests',
      accessor: d => d.num_guests,
    },
      {
        id: 'checked_in',
        Header: 'Checked in',
        accessor: d => d.is_checked_in.toString(),
      },
      {
        id: 'checked_out',
        Header: 'Checked out',
        accessor: d => d.is_checked_out.toString(),
      },
      {
        id: 'hotel_name',
        Header: 'Hotel',
        accessor: d => this.getHotelName(d.hotel),
      },


    ];
    let {customer_info, account_info, reservations} = this.state;
    return (
      <div className="default-container" style={{paddingTop: '5%'}}>
        {this.state.user_id && account_info && customer_info &&
        <Form model="customerForm" onSubmit={(val) => this.handleSubmit(val.customerForm)}>
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
            <Control.select model=".customerForm.payment_method">
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
        {
          reservations &&
          <div>
            <h2>Your reservations</h2>
            <Table
              sortByID="date"
              columns={columns}
              data={reservations}
              showPagination={false}
              minRows={5}
              className="-striped -highlight"
              // getTdProps={(state, rowInfo, column, instance) => {
              //   return {
              //     onClick: (e, handleOriginal) => {
              //       if(rowInfo && rowInfo.original){
              //         this.props.dispatch(setSelectedShift(rowInfo.original));
              //         history.push('/my_shift');
              //       }
              //       if (handleOriginal) {
              //         handleOriginal();
              //       }
              //     }
              //   };
              // }}
            />
          </div>
        }
        {
          !reservations &&
            <div>
              <h3>You don't have any reservation</h3>
            </div>
        }
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
};


export default connect(mapDispatchToProps)(Customer);

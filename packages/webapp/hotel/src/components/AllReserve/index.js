import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import styles from  './styles.scss';
import history from '../../history'
import Table from '../Table';
import api from '../../api';

const axios = require('axios');

class AllReserve extends Component {
  constructor(props) {
    super(props);
    this.state={user_id: null, hotel: {}, reservations:null}
    this.getReservation = this.getReservation.bind(this);
    this.getHotel = this.getHotel.bind(this);
    this.getHotelName = this.getHotelName.bind(this);
  }

  componentDidMount(){
    const user_id = localStorage.getItem('user_id');
    if(user_id){
      this.getHotel();
      this.setState({user_id});
      this.getReservation(user_id);

    }
  }

  getHotel() {
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
    if(hotels){
      for(let h of hotels){
        if (h.hotel_id ===id){
          return h.name;
        }
      }
    }

    return 'NO HOTEL FOUND'
  }

  getReservation(){
    let that = this;
    axios.get(api.reservation, api.headers).then((res)=>{
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

    const {reservations} = this.state;
    return (
      <div className="default-container" style={{paddingTop: '12%'}}>
        {
          reservations &&
          <div>
            <h2>All reservations</h2>
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
      </div>
    );
  }
}


export default AllReserve;

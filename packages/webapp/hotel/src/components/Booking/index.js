import React, {Component} from "react";
import {Button, Glyphicon} from 'react-bootstrap';
import styles from './styles.scss';
import history from '../../history'
import api from '../../api';
import {connect} from 'react-redux';
import {Control, Form, actions} from 'react-redux-form';
import {DateRangePicker} from 'react-dates';
import moment from 'moment';

const axios = require('axios');

class Booking extends Component {
  constructor(props) {
    super(props);
    let startDate = moment();
    let endDate = moment(startDate).add(90, 'd');
    this.state = {
      hotel: null,
      rooms: null,
      selectedHotel: null,
      startDate: startDate,
      endDate: endDate,
      focusedInput: null,
      uniqueAmenities:[],
      amenities: null,
      showSpa: 'none',
      showGym: 'none',
      showRes: 'none',
      resInfo: null,
      gymInfo:null,
      spaInfo:null,
    };
    this.getHotel = this.getHotel.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.getAmenity = this.getAmenity.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.getSingleAmenity = this.getSingleAmenity.bind(this);

  }

  componentDidMount() {
    // if(localStorage.getItem('isAuthenticated') !== 'true'){
    //   history.push('/')
    // }
    this.getHotel()

  }

  showInfo(type){

    if(type ==='spa'){
      this.setState({
        showSpa: 'flex',
        showGym: 'none',
        showRes: 'none',

      })
    }
    else if (type ==='gym'){
      this.setState({
        showSpa: 'none',
        showGym: 'flex',
        showRes: 'none',

      })
    }
    else if (type ==='res'){
      this.setState({
        showSpa: 'none',
        showGym: 'none',
        showRes: 'flex',

      })
    }
  }

  async getSingleAmenity(){
    const amens = this.state.amenities;
    let gymInfo = [];
    let resInfo = [];
    let spaInfo=[];
    for(let a of amens){
      let type = a.type;
      let result = await axios.get(api.host + type + '/' + a.amenity_id, api.headers);
      if(result.data){
          if(result.data.length>0){
            if(type === 'gym'){
               a = Object.assign(a, result.data[0]);

              gymInfo.push(a);
            }
            else if(type === 'restaurant'){
               a = Object.assign(a, result.data[0]);
              resInfo.push(a);
            }
            else if(type === 'spa'){
               a = Object.assign(a, result.data[0]);
              spaInfo.push(a);
            }
          }
      }
      //.then((res)=>{

      //   if(res.data.length>0){
      //     if(type === 'gym'){
      //        a = Object.assign(a, res.data[0]);
      //
      //       gymInfo.push(res.data[0]);
      //     }
      //     else if(type === 'restaurant'){
      //        a = Object.assign(a, res.data[0]);
      //       resInfo.push(res.data[0]);
      //     }
      //     else if(type === 'spa'){
      //        a = Object.assign(a, res.data[0]);
      //       spaInfo.push(res.data[0]);
      //     }
      //   }
      // })
    }
    gymInfo = gymInfo.length <1 ? null : gymInfo;
    resInfo = resInfo.length <1 ? null : resInfo
    spaInfo = spaInfo.length <1 ? null : spaInfo

    this.setState({
        gymInfo,
      resInfo,
      spaInfo,
    })
  }

  getAmenity(hotel_id){
    let that = this;
    axios.get(api.amenity + '/hotel/' + hotel_id, api.headers)
      .then(function (response) {
        // handle success
        const data = response.data;

        let a = [];
        for(let d of data){
          if(!a.includes(d.type)){
            a.push(d.type);
          }
        }
        that.setState({amenities: data, uniqueAmenities:a});
        that.getSingleAmenity();
      })
      .catch(function (error) {
        // handle error
        alert(JSON.stringify(error));
        console.error(error);
      });

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


  handleSubmit(form) {
    let user_id = localStorage.getItem('user_id');
    if(!user_id){
      alert('please log in');
    }
    if(form.room_id === ''){
      alert('please select a room');
      return
    }
    if(form.hotel_id === ''){
      alert('please select a hotel');
      return
    }
    let reservation = {
      user_id: user_id,
      hotel: form.hotel_id,
      room: form.room_id,
      has_breakfast: form.has_breakfast,
      num_guests: parseInt(form.num_guests, 10),
      is_checked_in: false,
      is_checked_out: false,
      check_in_date: this.state.startDate.format('YYYY-MM-DD HH:mm'),
      check_out_date: this.state.endDate.format('YYYY-MM-DD HH:mm'),
    };

    axios.post(api.reservation, reservation, api.headers).then((res)=>{
      if(res){
        alert('Your room is booked!');
        history.push('/customer');
      }
    }).catch((err)=>{
      console.error(err);
      alert('failed to book');
    })

  }

  setHotel(option) {
    let hotel_id = option.target.value;
    this.getAmenity(hotel_id);
    let that = this;
    axios.get(api.room + '/hotel/' + hotel_id , api.headers)
      .then(function (response) {
        // handle success
        const data = response.data;
        if(data.length > 0){
          that.setState({rooms: data});
        }
        else{
          that.setState({rooms: null});
          that.props.dispatch(actions.change('bookForm.bookForm.room_id', ''));
        }
      })
      .catch(function (error) {
        // handle error
        alert(JSON.stringify(error));
        console.error(error);
      })
  }
  onDatesChange({ startDate, endDate }) {
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
  }
  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

// })
  render() {
    const {hotel, rooms, uniqueAmenities, gymInfo, resInfo, spaInfo} = this.state;
    return (
      <div className="default-container" style={{paddingTop: '12%'}}>
        {
          hotel &&
          <Form model="bookForm" onSubmit={(val) => this.handleSubmit(val.bookForm)}>
            <div className={styles.selectContainer}>
              <label>Hotel branch</label>
              <Control.select model=".bookForm.hotel_id" onChange={(values)=>this.setHotel(values)}>
                <option value={''}>Select a hotel</option>
                {
                  hotel.map((h)=>{
                    return <option key={h.hotel_id}  value={h.hotel_id}>{h.name + ', ' + h.location}</option>
                  })
                }
              </Control.select>
            </div>
            <div>
              {
                uniqueAmenities.length>0 &&
                  <div>
                    <h4>Amenities</h4>
                    {
                      uniqueAmenities.includes('restaurant') &&
                        <Button bsSize="large" style={{marginRight: "10px"}} onClick={()=>this.showInfo('res')}>
                      <Glyphicon style={{width: "50px"}} glyph="cutlery"/>
                          Restaurant
                        </Button>
                    }
                    {
                      uniqueAmenities.includes('spa') &&
                      <Button bsSize="large" style={{marginRight: "10px"}} onClick={()=>this.showInfo('spa')}>
                        <Glyphicon style={{width: "50px"}} glyph="eye-open"/>
                        Spa
                      </Button>
                    }
                    {
                      uniqueAmenities.includes('gym') &&
                      <Button bsSize="large" style={{marginRight: "10px"}} onClick={()=>this.showInfo('gym')}>
                        <Glyphicon  glyph="scale"/>
                        Gym
                      </Button>
                    }

                    <div style={{display:this.state.showSpa,flexDirection:'column'}}>
                      {
                        spaInfo && spaInfo.map((i)=>{
                          return <div key={i.amenity_id}>
                            <h4>Info</h4>
                            <div className={styles.infoWrapper}>
                            <div className={styles.infoContainer}>
                              <label>Open:</label>
                              <div>
                                {i.opening}
                              </div>
                            </div>
                            <div className={styles.infoContainer}>
                              <label>Close:</label>
                              <div>
                                {i.closing}
                              </div>
                            </div>
                            <div className={styles.infoContainer}>
                              <label>Rating:</label>
                              <div>
                                {i.rating}
                              </div>
                            </div>
                              <div className={styles.infoContainer}>
                                <label>Massage:</label>
                                <div>
                                  {i.has_massage.toString()}
                                </div>
                              </div>
                              <div className={styles.infoContainer}>
                                <label>Massage:</label>
                                <div>
                                  {i.has_massage.toString()}
                                </div>
                              </div>
                              <div className={styles.infoContainer}>
                                <label>Salon:</label>
                                <div>
                                  {i.has_salon.toString()}
                                </div>
                              </div>
                              <div className={styles.infoContainer}>
                                <label>Hot Tub:</label>
                                <div>
                                  {i.has_hot_tub.toString()}
                                </div>
                              </div>
                              <div className={styles.infoContainer}>
                                <label>Tanning:</label>
                                <div>
                                  {i.has_tan_bed.toString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        })
                      }
                    </div>
                    <div style={{display:this.state.showRes,flexDirection:'column'}}>
                      {
                        resInfo && resInfo.map((i)=>{
                          return <div key={i.amenity_id}>
                            <h4>Info</h4>
                            <div className={styles.infoWrapper}>
                            <div className={styles.infoContainer}>
                              <label>Open:</label>
                              <div>
                                {i.opening}
                              </div>
                            </div>
                            <div className={styles.infoContainer}>
                              <label>Close:</label>
                              <div>
                                {i.closing}
                              </div>
                            </div>
                            <div className={styles.infoContainer}>
                              <label>Rating:</label>
                              <div>
                                {i.rating}
                              </div>
                            </div>
                              <div className={styles.infoContainer}>
                                <label>Bar:</label>
                                <div>
                                  {i.has_bar.toString()}
                                </div>
                              </div>
                              <div className={styles.infoContainer}>
                                <label>Cuisine:</label>
                                <div>
                                  {i.cuisine_type}
                                </div>
                              </div>
                              <div className={styles.infoContainer}>
                                <label>Budget:</label>
                                <div>
                                  {i.budget}
                                </div>
                              </div>
                            </div>
                          </div>
                        })
                      }
                    </div>
                    <div style={{display:this.state.showGym, flexDirection:'column'}}>
                      {
                        gymInfo && gymInfo.map((i)=>{
                          return <div key={i.amenity_id}>
                            <h4>Info</h4>
                            <div className={styles.infoWrapper}>
                              <div className={styles.infoContainer}>
                              <label>Open:</label>
                              <div>
                                {i.opening}
                              </div>
                            </div>
                              <div className={styles.infoContainer}>
                              <label>Close:</label>
                              <div>
                                {i.closing}
                              </div>
                            </div>
                              <div className={styles.infoContainer}>
                              <label>Rating:</label>
                              <div>
                                {i.rating}
                              </div>
                            </div>
                              <div className={styles.infoContainer}>
                                <label>Weights:</label>
                                <div>
                                  {i.has_weights.toString()}
                                </div>
                              </div>
                              <div className={styles.infoContainer}>
                                <label>Cardio:</label>
                                <div>
                                  {i.has_cardio.toString()}
                                </div>
                              </div>
                              <div className={styles.infoContainer}>
                                <label>Pool:</label>
                                <div>
                                  {i.has_pool.toString()}
                                </div>
                              </div>
                              <div className={styles.infoContainer}>
                                <label>Classes:</label>
                                <div>
                                  {i.has_class.toString()}
                                </div>
                              </div>
                          </div>
                          </div>
                        })
                      }
                    </div>
                  </div>


              }
              {
                !uniqueAmenities.length &&
                <h4>No amenity</h4>
              }
            </div>
            <div>
              <label>Available Rooms</label>
              {rooms &&
              <div className={styles.selectContainer}>
              <Control.select model=".bookForm.room_id">
                {
                  rooms.map((r)=>{
                    return <option key={r.room_id}  value={r.room_id}>{'Price: ' + r.price + ', Bed Type: ' + r.bed_type}</option>
                  })
                }
              </Control.select>
              </div>
              }
              {
                !rooms &&
                <div>No rooms available</div>
              }
            </div>
            <div className={styles.labelContainer}>
              <label>Number of Guests</label>
              <Control.text type="number" model=".bookForm.num_guests"  defaultValue={2} />
            </div>
            <div className={styles.labelContainer}>
              <label>Require breakfast?</label>
              <Control.checkbox model=".bookForm.has_breakfast"  defaultValue={false} />
            </div>
            <div>
              <DateRangePicker
                onDatesChange={this.onDatesChange}
                onFocusChange={this.onFocusChange}
                focusedInput={this.state.focusedInput}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
              />
            </div>
            <Button type='submit' bsStyle='warning' style={{marginTop: '30px'}}>Book Now!</Button>
          </Form>
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


export default connect(mapDispatchToProps)(Booking);


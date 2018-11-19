import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import styles from  './styles.scss';
import {connect} from 'react-redux';
import history from '../../history'
import { Control, Form } from 'react-redux-form';
import api from '../../api';
const axios = require('axios')

class AddAmenity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpa: false,
      showGym: false,
      showRes: false,
      hotel: null,
    };
    this.goPage = this.goPage.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAmenity = this.addAmenity.bind(this);

  }

  componentDidMount(){
    // if(localStorage.getItem('isAuthenticated') !== 'true'){
    //   history.push('/')
    // }
    let that = this;
    axios.get(api.hotel, api.headers)
      .then(function (response) {
        // handle success
        const data = response.data;
        that.setState({hotel: data});
      })
      .catch(function (error) {
        // handle error
        alert(error);
        console.error(error);
      })
  }
  toggleForm(type){
    if(type ==='spa'){
      this.setState({
        showSpa: true,
        showGym: false,
        showRes: false,

      })
    }
    else if (type ==='gym'){
      this.setState({
        showSpa: false,
        showGym: true,
        showRes: false,

      })
    }
    else if (type ==='res'){
      this.setState({
        showSpa: false,
        showGym: false,
        showRes: true,

      })
    }
    
  }
  goPage(path){
    history.push(path);
  }

  addAmenity(form, id,type){
    let f = {};
    if(type === 'spa'){
      f = {
        amenity_id: id,
        has_massage: form.has_massage,
        has_salon: form.has_salon,
        has_hot_tub: form.has_hot_tub,
        has_tan_bed: form.has_tab_bed
      }
    }
    axios.post(api.host + type, f,api.headers).then((res)=>{
      if(res.data){
        alert('created!');
      }
    }).catch((err)=>{
      alert('failed to create amenity');
      console.log(err);
    })
  }

  handleSubmit(form, type){
      let amenForm = {
        opening: form.opening,
        closing: form.closing,
        rating: parseInt(form.rating, 10),
        type: type,
        hotel_id: form.hotel_id,
      };
      let that = this;
      axios.post(api.amenity, amenForm, api.headers).then((res)=>{
        if(res.data && res.data.amenity_id){
          that.addAmenity(form, res.data.amenity_id, type);
        }
      }).catch((err)=>{
        alert('error');
        console.error(err);
      })
  }

  render() {
    let {showSpa, showGym, showRes, hotel} = this.state;
    return (
      <div className="default-container" style={{paddingTop: '12%'}}>
        <div className={styles.buttonContainer}>
          <h3>Choose an amenity type</h3>
          <Button bsStyle="warning" onClick={()=>this.toggleForm('spa')}>Spa</Button>
          <Button bsStyle="warning" onClick={()=>this.toggleForm('gym')}>Gym</Button>
          <Button bsStyle="warning" onClick={()=>this.toggleForm('res')}>Restaurant</Button>
        </div>
        {
          showSpa &&
          <Form model="amenForm" onSubmit={(val) => this.handleSubmit(val.amenForm, 'spa')}>
            { hotel.length>0 &&
              <div className={styles.selectContainer}>
                <label>Hotel branch</label>
                <Control.select model=".amenForm.hotel_id" defaultValue={this.state.hotel[0].hotel_id}>
                  {
                    this.state.hotel.map((h)=>{
                      return <option key={h.hotel_id}  value={h.hotel_id}>{h.name}</option>
                    })
                  }
                </Control.select>
              </div>
            }

            <div className={styles.labelContainer}>
              <label>Open hour</label>
              <Control.text model=".amenForm.opening" validators={{required: (val) => val.length}}  defaultValue={'8AM'}/>
            </div>
            <div className={styles.labelContainer}>
              <label>Close hour</label>
              <Control.text model=".amenForm.closing" validators={{required: (val) => val.length}}  defaultValue={'10PM'}/>
            </div>
            <div className={styles.labelContainer}>
              <label>rating</label>
              <Control.text type="number" model=".amenForm.rating"   defaultValue={4}/>
            </div>
            <div className={styles.labelContainer}>
              <label>Has massage?</label>
              <Control.checkbox model=".amenForm.has_massage" />
            </div>
            <div className={styles.labelContainer}>
              <label>Has salon?</label>
              <Control.checkbox model=".amenForm.has_salon" />
            </div>
            <div className={styles.labelContainer}>
              <label>Has hot tub?</label>
              <Control.checkbox model=".amenForm.has_hot_tub" v/>
            </div>
            <div className={styles.labelContainer}>
              <label>Has tab bed?</label>
              <Control.checkbox model=".amenForm.has_tan_bed" />
            </div>

            <Button type='submit' bsStyle='primary'>Add</Button>
          </Form>
        }
        {
          showRes &&
          <Form model="amenForm" onSubmit={(val) => this.handleSubmit(val.amenForm)}>
            <div className={styles.labelContainer}>
              <label>First Name</label>
              <Control.text model=".amenForm.opening"  />
            </div>
          </Form>
        }
        {
          showGym &&
          <Form model="amenForm" onSubmit={(val) => this.handleSubmit(val.amenForm)}>
            <div className={styles.labelContainer}>
              <label>First Name</label>
              <Control.text model=".amenForm.opening"  />
            </div>
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


export default connect(mapDispatchToProps)(AddAmenity);

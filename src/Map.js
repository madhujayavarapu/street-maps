/*eslint-disable*/
import React, {PropTypes, Component } from 'react';
import street from 'images/street.svg';
import 'css/App.css';
import GoogleMapReact from 'google-map-react';
import { Button, Input, InputNumber, Modal, Radio, notification,
        Menu, Dropdown, Icon, Row, Col } from 'antd';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Marker from './marker';
import {geolocated} from 'react-geolocated';
import * as firebase from 'firebase';
import Webcam from 'react-webcam';


const RadioGroup = Radio.Group;


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    
    static propTypes = {
        center: PropTypes.array,
        zoom: PropTypes.number
     };
     
    constructor(props){
        super(props);
        this.state = {
            slat: 0,
            slng: 0,
            lat: 17.7383948,
            lng: 82.9823155,
            zoom: 11,
            address: '',
            pop: false,
            gender: "male",
            markers: [{lat: 16.7852111, lng: 80.8270381},{ lat: 17.385044, lng: 78.486671 }],
            imageSrc: null,
            cam : false,
            addedUsers : [],
            currentLocation : true
       };
        this.onChange = (address) => this.setState({ address })
        
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.getLatLng = this.getLatLng.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeGender = this.changeGender.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
     
     getLatLng(){
         console.log("getLatLng is called.");
        if(this.props.isGeolocationAvailable){
            if(this.props.isGeolocationEnabled){
                if(this.props.coords){
                    console.log(this.props.coords.latitude);
                    console.log(this.props.coords.longitude);
                    this.setState({
                        lat: this.props.coords.latitude,
                        lng: this.props.coords.longitude
                    });
                    console.log("lat&lng are changed...", this.state.lat, this.state.lng);
                }
                else{
                    console.log("props coords is not find.");
                }
            }
            else{
                console.log("geolocation is not enabled");
            }
        }
        else{
        }
        this.setState({
           zoom: 14
        });
    }
    
    handleFormSubmit = (event) => {
        event.preventDefault();
    
        geocodeByAddress(this.state.address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {console.log('Success', latLng);
                console.log("latitude is :", latLng.lat);
                console.log("Longitude is :", latLng.lng);
                this.setState({
                    lat: latLng.lat,
                    lng: latLng.lng
                });
                console.log("lat&lng are changed...", this.state.lat, this.state.lng);
          })
          .catch(error => console.error('Error', error))
      }
      
      componentDidMount(){
          console.log("Component Mounted....");
          this.databaseRef = firebase.database().ref('add');
          this.databaseRef.on('value',(dataSnap) => {
            this.setState({
               addedUsers: dataSnap.val()
            });
          }); 
    }
    
      componentWillUnmount() {
        this.databaseRef.off();
      }
      
      handleAdd(){
          this.setState({
              pop: true
          });
      }
      
      handleCancel(){
          this.setState({
              pop: false
          });
      }
    
    handleSubmit(event){
        event.preventDefault();
        
         let newKey = this.databaseRef.push().key;
         
         let imagePath ="street/"+newKey+"/"+event.target.image.files[0].name;
        
        
        let newPerson = {
            address : event.target.address.value,
            landmark : event.target.lm.value,
            name : event.target.name.value,
            age : event.target.age.value,
            skill: event.target.skill.value,
            gender : this.state.gender,
            lat : this.state.lat,
            lng : this.state.lng,
            condition : event.target.condition.value,
            category : event.target.category.value,
            img : imagePath
        }
        
        console.log(event.target.image.files[0]);
        
        
        let storageRef = firebase.storage().ref();
        
        console.log(newPerson);
        
        let newPersonPushed = {};
        
        newPersonPushed[''+newKey] = newPerson;
        
        storageRef.child(imagePath).put(event.target.image.files[0])
        
        
        this.databaseRef.update(newPersonPushed).then(this.handleSuccess).catch(this.handleFail);
        
        this.setState({
            pop: false
        })
    }
    
    handleSuccess(){
        console.log("Person added");
        notification.success({
            message: 'person Added',
            description: 'all the details added to the firebase.!'
         });
    }
    handleFail(){
        console.log("failed");
        notification.error({
            message: 'Failed to Add person',
            description: 'Please try again!'
         });
    }
    
    changeGender(e){
        this.setState({
            gender : e.target.value
        });
    }
  
  
	
    
  render() {
      
       const inputProps = {
        value: this.state.address,
         onChange: this.onChange,
         placeholder: 'Search Places...'
        }
        
        
        let allItemsDisplayed = [];
        
        if(this.state.addedUsers == null){
          console.log("No markers are present.");
        }
        else{
           allItemsDisplayed =  Object.keys(this.state.addedUsers).map((key) => {
               
               return (
                        <Marker
                          lat={this.state.addedUsers[key].lat}
                          lng={this.state.addedUsers[key].lng}
                            text={"H"}
                        />
                );
           });
        }
        console.log({allItemsDisplayed});

    return (
     <div style={{position: "realtive",width: '100%', height: '500px'}}>
     
     
        
                <form onSubmit={this.handleFormSubmit}>
                    <PlacesAutocomplete inputProps={inputProps} /><br /><br />
                    <Button type="primary" style={{background: "#000",color: "#fff"}} htmlType="submit">Search</Button>
                  </form>
                  <br />
        <Button type="primary" style={{background: "#000", color: "#ff"}} onClick={this.handleAdd}>Add Homeless</Button>&nbsp;&nbsp;
        <Button type="primary" style={{background: "#000", color: "#fff"}} onClick={this.getLatLng}>CurrenLocation</Button>
                <br /><br />
        <br />
        <GoogleMapReact
            
                    bootstrapURLKeys={{
                        key: "AIzaSyAcS52skiqBCvLlpZ5Dkm1rh25WQ4-6CIM"
                      }}
                    center={[this.state.lat, this.state.lng]}
                    zoom={this.state.zoom}
                    >
                    <Marker
                              lat={this.state.lat}
                              lng={this.state.lng}
                                text={"C"}/>
                        
                        {allItemsDisplayed}
                  
                  </GoogleMapReact> 
     
     <Modal title="Add"
            visible={this.state.pop}
            onCancel={this.handleCancel}
            footer={null} width='70%'>
            <div>
            <form onSubmit={this.handleSubmit}>
            
                <strong>If marker is not at the current location then enter the location of the Homeless.</strong>
                <br /><br />
                <Input placeholder="Address areacity" name="address" />&nbsp;&nbsp;
                <Input placeholder="Nearest Landmark" name="lm"/><br /> <br />
                
                <Input placeholder="Name" name="name" /><br /> <br />
                <InputNumber placeholder="Age" name="age" /><br /><br />
                <Input placeholder="Skills" name="skill" /><br /> <br />
                <RadioGroup onChange={this.changeGender} 
                    value={this.state.gender} name="gender">
                    <Radio value={"male"}>male</Radio>
                    <Radio value={"female"}>female</Radio>
                  </RadioGroup><br /><br />
                  <select name="condition">
                    <option value={"Fit"}>Fit</option>
                    <option value={"Old"}>Old</option>
                    <option value={"Handicapped"}>Handicapped</option>
                </select>
                 <br /> <br />
                <strong>Upload a pic of homeless:-</strong><br /><br />
                <input type="file" name="image" /><br />
                <select name="category">
                   <option value="working">Working</option>
                     <option value="not working">Not Working</option>
                     <option value="need a job">Need A Job</option>
                     <option value="won't work">Won't work</option>
                     <option value="will beg">will beg</option>
                </select><br /><br />
                <Button type="primary" htmlType="submit">Add</Button>
            </form>
          </div>
        </Modal>
    </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000
})(Map);

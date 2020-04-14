import React from 'react';
import {
  Text,
  Button,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput,
  TouchableHighlight,
  InteractionManager,
  DeviceEventEmitter } from 'react-native';
import TripDisplayContainer from './components/trip-display-container';
import LocationElement from './components/location-element';
import  IconElement  from './components/icon-element';
import TripModeElement from './components/trip-mode';
import Dialog from "react-native-dialog";
import Modal from 'react-native-modalbox';
import BackgroundGeolocation from "react-native-background-geolocation";
import { getDistance, getPreciseDistance } from 'geolib';

var screen = Dimensions.get('window');

class TripDisplay extends React.Component {
  constructor(props) {
    super(props);
    //this.distance = [];
    this.state = {isOpen: false,
      isDisabled: false,
      sliderValue: 0.3,
      dialogVisible:false,
      start:'',
      duration:'-',
      distance: '-',
      isStarted:false,
      tripMode: 'cycling',
      swipeToClose: true,
      currentPosition:null}
  }
  selectTripMode(){
      //this.setState({dialogVisible:true});
      this.refs.modal1.open()
  }


  renderList() {
    var list = [];

    for (var i=0;i<50;i++) {
      list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
    }

    return list;
  }

  startTrip () {
    if(!this.state.isStarted){
      let _current_date = Date.now();
      console.log("startTrip::",_current_date.toString())
      this.setState({start: _current_date.toString(),startLocation: null, duration:0,distance:0,isStarted:true})
      console.log("startTrip::",this.state.start);
      BackgroundGeolocation.changePace(true);
    }
  }

  stopTrip () {
    if(this.state.isStarted){
      this.setState({duration:'-',startLocation: null, currentPosition:null, isStarted:false});
      BackgroundGeolocation.sync((records) => {
        console.log("[sync] SUCCESS DURING SYNC: ", records);
        BackgroundGeolocation.setConfig({params: {}});
      })
    }
  }

  async updateHttpRequestParams(location){
    let currentPosition;
    let lastPosition;
    /*let location = await BackgroundGeolocation.getCurrentPosition({
      timeout: 30,          // 30 second timeout to fetch location
      maximumAge: 5000,     // Accept the last-known-location if not older than 5000 ms.
      desiredAccuracy: -1 ,  // Try to fetch a location with an accuracy of `10` meters.
      samples: 1,           // How many location samples to attempt.
    });*/
    //console.log("[updateHttpRequestParams]-->",location);
    if(location){

      currentPosition = location;
      if(this.state.currentPosition) {
        lastPosition = this.state.currentPosition;
        var pdis = await getPreciseDistance(
        { latitude: lastPosition.coords.latitude, longitude: lastPosition.coords.longitude },
        { latitude: currentPosition.coords.latitude, longitude: currentPosition.coords.longitude }
      );
      if(!this.state.startLocation){
        this.setState({startLocation:currentPosition})
      }
      //console.log(this.distance);
      //this.distance.push(pdis)
      pdis +=this.state.distance;
      this.setState({distance:pdis})

      if(!this.state.startLocation){
        let _latitude = this.state.startLocation.coords.latitude;
        let _longitude = this.state.startLocation.coords.longitude ;
        let _speed = this.state.startLocation.coords.speed;
        let _baterryLevel = this.state.startLocation.battery.level;
        let _accuracy = this.state.startLocation.coords.accuracy;
        let _timestamp = this.state.startLocation.timestamp;
        let _altitude = this.state.startLocation.coords.altitude;
        let _is_charging = this.state.startLocation.battery.is_charging;
        let _wifiInfo = global.wifiInfo.ssid;
        if(!_wifiInfo) _wifiInfo = "";

        BackgroundGeolocation.ready({
          params: {
                    "trip": '{\
                      "distance": "'+ pdis +'", \
                      "start_location":{\
                        "type":"Feature",\
                        "geometry":{\
                          "type":"Point",\
                          "coordinates":[ \"'+ _latitude +'\",\"'+ _longitude +'\"]\
                        },\
                        "properties":{\
                          "motion":[],\
                          "speed": \"'+ _speed +'\",\
                          "battery_level": \"'+ _baterryLevel +'",\
                          "wifi": \"'+ _wifiInfo +'",\
                          "vertical_accuracy": \"\",\
                          "horizontal_accuracy": \"'+ _accuracy +'\",\
                          "timestamp": \"'+ _timestamp +'\",\
                          "altitude": \"'+ _altitude +'\",\
                          "battery_state": \"'+ _is_charging +'\"\
                        }\
                      }\
                    }'
                }
        },(state)=>{
          console.log(state)
        });
      }
      }
      this.setState({currentPosition:location})
    }
  }

  componentDidMount() {
    this.eventListener = DeviceEventEmitter.addListener('closeEvent',this.handleEvent);

    BackgroundGeolocation.onLocation((location) => {
      console.log("[onLocation] ", location);
      this.refresh(location);
    });

    BackgroundGeolocation.onHeartbeat((event) => {
      console.log("[onHeartbeat] ", event);
      this.refresh(null);
    });
  }

  refresh(location) {
    try{
        if(this.state.isStarted){
          let current_timestamp = Date.now();
          let start_timestamp = Number(this.state.start);

          let diffDateLastLocation = current_timestamp - start_timestamp;
          let l_diffMinute = Math.floor(diffDateLastLocation/(60*1000));
          this.setState({duration:l_diffMinute})
          if(location)
            this.updateHttpRequestParams(location)
        }
    }
    catch{

    }
  }
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleSave = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };
  handleEvent=(event)=>{
   //Do something with event object
   this.setState({ tripMode: event });
   this.refs.modal1.close()
   this.startTrip()
  }

  componentWillUnmount(){
        //remove listener
        this.eventListener.remove();

  }
  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just opened');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  render() {
    let inTrip =   this.state.isStarted;
    let _duration;
    if(this.state.duration!="-"){
      _duration = this.state.duration<60?this.state.duration:Math.floor(this.state.duration/60)+':'+Math.floor(this.state.duration/(60) % 60)
    }else{
      _duration = '-'
    }
    return (

      <TripDisplayContainer trip={inTrip}>

        <Modal
          style={[styles.modal,styles.modal1]}
          ref={"modal1"}
          coverScreen={true}
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}
          >
          <TripModeElement />
        </Modal>
        <View
          style={{
            margin: 5,
            width:"90%",
            flexDirection: 'row',
            justifyContent: 'space-between'}}>

          <IconElement mobilityType={this.state.tripMode}/>
          <LocationElement title={'DURATION'} value={_duration} description={this.state.duration<60?'minutes':'hh:mm'} />
          <LocationElement title={'DISTANCE'} value={this.state.distance} description={'m'} />
          <TouchableHighlight
            style={inTrip?styles.inTrip:styles.notTrip}
            onPress={() => inTrip?this.stopTrip():this.selectTripMode()}
            underlayColor='#fff'>
            <Text  style={styles.noTripText}>{inTrip?'Stop':'Start'}</Text>
          </TouchableHighlight>
        </View>
      </TripDisplayContainer>
    );
  }
}

const styles = StyleSheet.create({

  notTrip:{
     backgroundColor:'#5bce84',
     borderRadius:5,
     borderWidth: 1,
     borderColor: '#5bce84',
     width:120,
     justifyContent: 'center',
     alignItems: 'center'
   },
 inTrip:{
    backgroundColor:'#234F32',
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#234F32',
    width:120,
    justifyContent: 'center',
    alignItems: 'center'
  },
 noTripText:{
     color:'#fff',
     fontSize: 16
 },
  wrapper: {
    paddingTop: 50,
    flex: 1
  },

  modal: {
    marginTop:0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal1: {
    height: 400,
    backgroundColor: "#f4f4f4"
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

  text: {
    color: "black",
    fontSize: 22
  }

});

export default TripDisplay;

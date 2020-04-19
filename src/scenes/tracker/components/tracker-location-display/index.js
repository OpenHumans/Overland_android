import React from 'react';
import { Text, Button, View, StyleSheet, TouchableHighlight, InteractionManager } from 'react-native';
import TrackerLocationDisplayContainer from './components/tracker-location-display-container';
import LocationElement from './components/location-element';
import GPSElement from './components/gps-element';
import BackgroundGeolocation from "react-native-background-geolocation";
import NetInfo from "@react-native-community/netinfo";
import {scale} from '../../../../utils/scaling';

function AlertHttp(props){
  if(props.displayMessage){
    return (
      <View  style={{
          borderRadius: 4,
          marginTop: 5,
          padding: 10,
          backgroundColor:'#FF8D52',
          flexDirection: 'row',
          width:"100%",
          justifyContent: 'space-between'}}>
          <Text  style={styles.submitText}>Invalid url, go in settings</Text>
      </View>);
  }else{
    return null;
  }

}


class TrackerLocationDisplay extends React.Component {
  constructor(props) {
     super(props);
     this.state = {syncAvailable:global.isConnected,displayMessage:false,queueSize: '0' ,lastSent: '-', diffDateLastLocation: '-',speed: '-',latitude: '--',longitude: '--', accuracy: '--', selectedLocationId: -1, isReady: false };
     this.refresh = this.refresh.bind(this);
   }

   componentDidMount() {
     this.timerID = setInterval(
       () => this.tick(),
       1000
     );
     InteractionManager.runAfterInteractions(() => {
       this.refresh();
     });
     BackgroundGeolocation.onHttp(httpEvent => {
       if (httpEvent.success==false) {
         if (httpEvent.status!=200){
           this.setState({syncAvailable:false,displayMessage:true})
         }else {
           this.setState({syncAvailable:false,displayMessage:false})
         }
       } else {
         this.setState({syncAvailable:true,displayMessage:false})
       }
     });
     NetInfo.addEventListener(state => {
       this.setState({syncAvailable:state.isConnected})
       this.submitSuggestion()
     });
   }

   componentWillUnmount() {
     clearInterval(this.timerID);
   }

   tick() {
     this.refresh();
   }
   zeroPad (num, places) {
     return String(num).padStart(places, '0')
   }
   async refresh() {
     try{
       let locations = await BackgroundGeolocation.getLocations();
       let queueSize = locations.length;
       if (queueSize>=1) {
         let last_location = locations[queueSize - 1];
         let last_timestamp = new Date(locations[queueSize - 1].properties.timestamp);
         let first_location = locations[0];
         let first_timestamp = new Date(locations[0].properties.timestamp);
         let current_timestamp = new Date();
         let diffDateLastLocation = current_timestamp - last_timestamp;
         let diffDateFirstLocation = current_timestamp - first_timestamp;
         let l_diffHour = Math.floor(diffDateLastLocation/(60*60*1000) % 24);
         let l_diffMinute = Math.floor(diffDateLastLocation/(60*1000) % 60);
         let l_diffSeconde = Math.floor(diffDateLastLocation/(1000) % 60);
         let f_diffMinute = Math.floor(diffDateFirstLocation/(60*1000) % 60);
         let f_diffSeconde = Math.floor(diffDateFirstLocation/(1000) % 60);
         let s_diffDateFirstLocation = this.zeroPad(f_diffMinute,2)+':'+this.zeroPad(f_diffSeconde,2);

         let s_diffDateLastLocation = this.zeroPad(l_diffHour,2) +':'+this.zeroPad(l_diffMinute,2)+':'+this.zeroPad(l_diffSeconde,2);
         if(diffDateLastLocation > 60*60*1000*24 ){
           s_diffDateLastLocation = '> 1day'
         }
         if(diffDateFirstLocation > 60*1000*24 ){
           s_diffDateFirstLocation = '> 1h'
         }
         let speed = Math.floor(last_location.properties.speed)
         if(speed==='NaN') {
           let speed = '-'
         }
         this.setState({ lastSent: String(s_diffDateFirstLocation), queueSize: String(queueSize), diffDateLastLocation: s_diffDateLastLocation, speed: String(speed), latitude: String(last_location.geometry.coordinates[0]),longitude: String(last_location.geometry.coordinates[1]),accuracy:Math.floor(last_location.properties.horizontal_accuracy), isReady: true });
       } else {
         this.setState({lastSent: '-', queueSize: '0' ,diffDateLastLocation: '-',speed: '-',latitude: '--',longitude: '--',accuracy: '--', selectedLocationId: -1, isReady: false });
       }
     }
     catch{
       this.setState({lastSent: '-', queueSize: '0' ,diffDateLastLocation: '-',speed: '-',latitude: '--',longitude: '--',accuracy: '--', selectedLocationId: -1, isReady: false });
     }
   }

  async submitSuggestion() {
    /*const res = await BackgroundGeolocation.forceSync()*/
    try{
      BackgroundGeolocation.sync((records) => {
        console.log("[sync] success: ", records);
        //let current_timestamp = new Date();
        //let diffDateLastLocation = current_timestamp - last_timestamp;
        this.setState({syncAvailable:true})
      }).catch((error) => {
        console.log("[sync] FAILURE: ", error);
        this.setState({syncAvailable:false})
      });
    }catch{
      console.log("[sync] BAD CATCH - FAILURE: ");
      this.setState({syncAvailable:false})
    }


  }

  notAvailable(){

  }


  render() {
    let syncAvailable = this.state.syncAvailable;
    let displayMessage = this.state.displayMessage;
    return (
      <TrackerLocationDisplayContainer>
      <AlertHttp displayMessage={displayMessage} />
      <View style={{
            marginTop: 20,
            marginBottom: 20,
            flexDirection: 'row',
            width:"100%",
            justifyContent: 'space-between'}}>
        <LocationElement title={'QUEUED'} value={this.state.queueSize} description={'locations'} />
        <LocationElement
          title={'LAST SENT'}
          value={this.state.lastSent}
          description={this.state.lastSent === '> 1h' ? ' ' : 'minutes ago'}
        />
        <TouchableHighlight
          style={syncAvailable?styles.submit:styles.notSubmit}
          onPress={() => syncAvailable?this.submitSuggestion():this.notAvailable()}
          underlayColor='#fff'>
          <Text  style={styles.submitText}>Send now</Text>
        </TouchableHighlight>
      </View>

      <View
        style={{
          marginTop: 20,
          marginBottom: 20,
          width:"100%",
          flexDirection: 'row',
          justifyContent: 'space-between'}}>
          <LocationElement
            title={'AGE'}
            value={this.state.diffDateLastLocation}
            description={'hh:mm:ss ago'}
          />
          <LocationElement title={'SPEED'} value={this.state.speed} description={'m/s'} />
          <GPSElement
            title={'LOCATION'}
            valueX={this.state.latitude}
            valueY={this.state.longitude}
            description={'+/- ' + this.state.accuracy + 'm'}
          />
        </View>
      </TrackerLocationDisplayContainer>
    );
  }
}

const styles = StyleSheet.create({
  submit:{
   backgroundColor:'#5bce84',
   borderRadius:5,
   borderWidth: 1,
   borderColor: '#5bce84',
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'

 },
 notSubmit:{
   backgroundColor:'#969696',
   borderRadius:5,
   borderWidth: 1,
   borderColor: '#969696',
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },
 submitText:{
     color:'#fff',
     fontSize: scale(14)
 }
});

export default TrackerLocationDisplay;

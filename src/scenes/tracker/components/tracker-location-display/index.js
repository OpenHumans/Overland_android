import React from 'react';
import { Text, Button, View, StyleSheet, TouchableHighlight, InteractionManager } from 'react-native';
import TrackerLocationDisplayContainer from './components/tracker-location-display-container';
import LocationElement from './components/location-element';
import GPSElement from './components/gps-element';
import BackgroundGeolocation from "react-native-background-geolocation";

class TrackerLocationDisplay extends React.Component {
  constructor(props) {
     super(props);
     this.state = {queueSize: '0' ,lastSent: '-', diffDateLastLocation: '-',speed: '-',latitude: '--',longitude: '--', accuracy: '--', selectedLocationId: -1, isReady: false };
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
    BackgroundGeolocation.sync((records) => {
      console.log("[sync] success: ", records);
    }).catch((error) => {
      console.log("[sync] FAILURE: ", error);
    });

  }

  deleteAllData (){
    /*BackgroundGeolocation.deleteAllLocations();*/
    this.setState({lastSent: '00:00', queueSize: '0' ,diffDateLastLocation: '-',speed: '-',latitude: '--',longitude: '--',accuracy: '--', selectedLocationId: -1, isReady: false });
  }

  render() {
    return (
      <TrackerLocationDisplayContainer>
      <View style={{    margin: 20,
            flexDirection: 'row',
            width:"90%",
            justifyContent: 'space-between'}}>
        <LocationElement title={'QUEUED'} value={this.state.queueSize} description={'locations'} />
        <LocationElement
          title={'LAST SENT'}
          value={this.state.lastSent}
          description={this.state.lastSent === '> 1h' ? ' ' : 'minutes ago'}
        />
        <TouchableHighlight
          style={styles.submit}
          onPress={() => this.submitSuggestion()}
          underlayColor='#fff'>
          <Text  style={styles.submitText}>Send now</Text>
        </TouchableHighlight>
      </View>

      <View
        style={{
          margin: 20,
          width:"90%",
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
   borderColor: '#fff',
   width:120,
   justifyContent: 'center',
   alignItems: 'center'

 },
 submitText:{
     color:'#fff',
     fontSize: 16
 }
});

export default TrackerLocationDisplay;

import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight,InteractionManager } from 'react-native';
import TripDisplayContainer from './components/trip-display-container';
import LocationElement from './components/location-element';
import  IconElement  from './components/icon-element';
import GPSElement from './components/gps-element';

class TripDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {start:'',duration:'-',isStarted:false}
  }

  startTrip () {
    if(!this.state.isStarted){
      let _current_date = Date.now();
      console.log("startTrip::",_current_date.toString())
      this.setState({start: _current_date.toString(),duration:'-',isStarted:true})
      console.log("startTrip::",this.state.start)
    }
    else {
      this.setState({duration:'-', isStarted:false});      
      clearInterval(this.timerID);
    }

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

  tick() {
    this.refresh();
  }

  refresh() {
    try{
        if(this.state.isStarted){
          let current_timestamp = Date.now();
          let start_timestamp = Number(this.state.start);

          let diffDateLastLocation = current_timestamp - start_timestamp;
          let l_diffMinute = Math.floor(diffDateLastLocation/(60*1000));
          this.setState({duration:l_diffMinute})
        }
    }
    catch{

    }
  }

  render() {
    let inTrip =   this.state.isStarted;
    return (
      <TripDisplayContainer trip={inTrip}>
        <View
          style={{
            margin: 5,
            width:"90%",
            flexDirection: 'row',
            justifyContent: 'space-between'}}>

          <IconElement mobilityType={'cycling'}/>
          <LocationElement title={'DURATION'} value={this.state.duration} description={'minutes'} />
          <LocationElement title={'DISTANCE'} value={''} description={'miles'} />
          <TouchableHighlight
            style={inTrip?styles.inTrip:styles.notTrip}
            onPress={() => this.startTrip()}
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


 }
});

export default TripDisplay;

import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import TripDisplayContainer from './components/trip-display-container';
import LocationElement from './components/location-element';
import  IconElement  from './components/icon-element';
import GPSElement from './components/gps-element';

class TripDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  submitSuggestion () {
  }

  render() {
    return (
      <TripDisplayContainer>
        <View
          style={{
            margin: 5,
            width:"90%",
            flexDirection: 'row',
            justifyContent: 'space-between'}}>

          <IconElement mobilityType={'cycling'}/>
          <LocationElement title={'DURATION'} value={''} description={'minutes'} />
          <LocationElement title={'DISTANCE'} value={''} description={'miles'} />
          <TouchableHighlight
            style={styles.submit}
            onPress={() => this.submitSuggestion(this.props)}
            underlayColor='#fff'>
            <Text  style={styles.submitText}>Start</Text>
          </TouchableHighlight>
        </View>
      </TripDisplayContainer>
    );
  }
}

const styles = StyleSheet.create({

  submit:{
   backgroundColor:'#5bce84',
   borderRadius:5,
   borderWidth: 1,
   borderColor: '#5bce84',
   width:120,
   justifyContent: 'center',
   alignItems: 'center'

 },
 submitText:{
     color:'#fff',
     fontSize: 16


 }
});

export default TripDisplay;

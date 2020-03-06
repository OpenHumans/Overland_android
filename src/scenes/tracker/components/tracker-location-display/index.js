import React from 'react';
import { Text, Button, View, StyleSheet, TouchableHighlight } from 'react-native';
import TrackerLocationDisplayContainer from './components/tracker-location-display-container';
import LocationElement from './components/location-element';
import GPSElement from './components/gps-element';

class TrackerLocationDisplay extends React.Component {
  constructor(props) {
    super(props);
  }
  submitSuggestion () {

  }

  render() {
    return (
      <TrackerLocationDisplayContainer>
      <View style={{    margin: 20,
    flexDirection: 'row',
    width:"90%",
    justifyContent: 'space-between'}}>
        <LocationElement title={'QUEUED'} value={8} description={'locations'} />
        <LocationElement
          title={'LAST SENT'}
          value={'00:09'}
          description={'minutes ago'}
        />

        <TouchableHighlight
          style={styles.submit}
          onPress={() => this.submitSuggestion(this.props)}
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
            value={'00:09'}
            description={'minutes ago'}
          />
          <LocationElement title={'SPEED'} value={73} description={'mph'} />
          <GPSElement
            title={'LOCATION'}
            valueX={'37.399999'}
            valueY={'-122.2313'}
            description={'accuracy'}
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

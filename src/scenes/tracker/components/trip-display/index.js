import React from 'react';
import { Text, Button, View } from 'react-native';
import TripDisplayContainer from './components/tracker-location-display-container';
import LocationElement from './components/location-element';
import GPSElement from './components/gps-element';

class TripDisplay extends React.Component {
  constructor(props) {
    super(props);
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
          <LocationElement
            title={'TYPE'}
            value={'im'}
            description={'bicycle'}
          />
          <LocationElement title={'DURATION'} value={''} description={'minutes'} />
          <LocationElement title={'DISTANCE'} value={''} description={'miles'} />
          <Button title="Start" color='#5bce84' style={{
            height: '100%', width:'100%',textAlignVertical: 'center',textAlign: 'center'}} />
        </View>
      </TripDisplayContainer>
    );
  }
}

export default TripDisplay;

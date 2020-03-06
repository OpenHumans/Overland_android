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
          <View
            style={{
              height: '30%',
              justifyContent: 'center',
              alignItems: 'center' }}>
              <Button title="START" color='#5bce84' />

          </View>
        </View>
      </TripDisplayContainer>
    );
  }
}

export default TripDisplay;

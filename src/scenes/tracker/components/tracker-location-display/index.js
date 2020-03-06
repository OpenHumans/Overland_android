import React from 'react';
import { Text, Button, View } from 'react-native';
import TrackerLocationDisplayContainer from './components/tracker-location-display-container';
import LocationElement from './components/location-element';
import GPSElement from './components/gps-element';

class TrackerLocationDisplay extends React.Component {
  constructor(props) {
    super(props);
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
        <View
          style={{
            height: '30%',

            justifyContent: 'center',
            alignItems: 'center' }}>
            <Button title="SEND NOW" color='#5bce84'/>

        </View>
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

export default TrackerLocationDisplay;

import React from 'react';
import { Text } from 'react-native';
import TrackerLocationDisplayContainer from './components/tracker-location-display-container';
import LocationElement from './components/location-element';

class TrackerLocationDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TrackerLocationDisplayContainer>
        <LocationElement title={'Queued'} value={8} description={'locations'} />
        <LocationElement
          title={'LAST SENT'}
          value={'00:09'}
          description={'minutes ago'}
        />
        <LocationElement
          title={'AGE'}
          value={'00:09'}
          description={'minutes ago'}
        />
        <LocationElement title={'SPEED'} value={73} description={'mph'} />
        <LocationElement
          title={'LOCATION'}
          value={'37.399999 -122.2313'}
          description={'accuracy'}
        />
      </TrackerLocationDisplayContainer>
    );
  }
}

export default TrackerLocationDisplay;

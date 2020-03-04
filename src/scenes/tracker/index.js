import React from 'react';
import { Text } from 'react-native';
import TrackerContainer from './components/tracker-container';
import TrackerSwitch from './components/tracker-switch';
import TrackerInterval from './components/tracker-interval';
import TrackerLocationDisplay from './components/tracker-location-display';

class Tracker extends React.Component {
  render() {
    return (
      <TrackerContainer>
        <Text>Overland</Text>
        <TrackerSwitch />
        <TrackerInterval />
        <TrackerLocationDisplay />
      </TrackerContainer>
    );
  }
}

export default Tracker;

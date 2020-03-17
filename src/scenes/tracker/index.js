import React from 'react';
import { Text,StyleSheet,View } from 'react-native';
import TrackerContainer from './components/tracker-container';
import TrackerSwitch from './components/tracker-switch';
import TrackerInterval from './components/tracker-interval';
import TrackerLocationDisplay from './components/tracker-location-display';
import TripDisplay from './components/trip-display';

class Tracker extends React.Component {
  render() {
    return (
      <TrackerContainer>
        <View style={[styles.header]}>
          <Text style={[styles.headerContent]}>Overland</Text>
        </View>
        <TrackerSwitch />
        <TrackerInterval />
        <TrackerLocationDisplay />
        <TripDisplay />
      </TrackerContainer>
    );
  }
}

export default Tracker;

const styles = StyleSheet.create({

  header: {
    marginTop: 10
  },
  headerContent: {
    fontSize:24
  }

});

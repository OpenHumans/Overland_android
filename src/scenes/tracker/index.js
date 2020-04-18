import React from 'react';
import { Text,StyleSheet,View,ScrollView } from 'react-native';
import TrackerContainer from './components/tracker-container';
import TrackerSwitch from './components/tracker-switch';
import TrackerInterval from './components/tracker-interval';
import TrackerLocationDisplay from './components/tracker-location-display';
import TripDisplay from './components/trip-display';
import BackgroundGeolocation from "react-native-background-geolocation";

class Tracker extends React.Component {
  constructor() {
    super()
  }
  render() {

    return (
      <TrackerContainer>
        <View style={[styles.header]}>
          <Text style={[styles.headerContent]}>Overland</Text>
        </View>
        <ScrollView>
          <TrackerSwitch />
          <TrackerInterval />
          <TrackerLocationDisplay />
          <TripDisplay />
        </ScrollView>
      </TrackerContainer>
    );
  }
}

export default Tracker;

const styles = StyleSheet.create({

  header: {
    marginTop: 10,
    marginBottom: 10
  },
  headerContent: {
    fontSize:24
  }

});

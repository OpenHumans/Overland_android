import React from 'react';
import { Text,StyleSheet,View, ScrollView } from 'react-native';
import SettingsContainer from './components/settings-container';
import SignificantLocation from './components/significant-location';
import ActivityType from './components/activity-type';
import DesiredAccuracy from './components/desired-accuracy';
import DeferLocUpdates from './components/defer-location-updates';
import PtsPerBatch from './components/point-per-batch';
import UpdateSwitch from './components/update-switch';
import ResumeGeofence from './components/resume-geofence';
import StatsSwitch from './components/stats-switch';

class Settings extends React.Component {
    constructor () {
    super()
    this.state = {
      selectedIndex: 2
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render() {
    return (
      <ScrollView>
      <SettingsContainer>
        <View style={[styles.header]}>
          <Text style={[styles.headerContent]}>SETTINGS</Text>
        </View>
        <SignificantLocation />
        <ActivityType />
        <DesiredAccuracy />
        <DeferLocUpdates />
        <PtsPerBatch />
        <UpdateSwitch />
        <ResumeGeofence />
        <StatsSwitch />
      </SettingsContainer>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  header: {
    marginTop: 10
  },
  headerContent: {
    fontSize:16
  }

});

export default Settings;

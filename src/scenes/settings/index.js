import React from 'react';
import { Text,StyleSheet,View } from 'react-native';
import SettingsContainer from './components/settings-container';
import SignificantLocation from './components/significant-location';
import ActivityType from './components/activity-type';
import DesiredAccuracy from './components/desired-accuracy';
import DeferLocUpdates from './components/defer-location-updates';
import PtsPerBatch from './components/points-per-batch';

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
      <SettingsContainer>
        <View style={[styles.header]}>
          <Text style={[styles.headerContent]}>SETTINGS</Text>
        </View>
        <SignificantLocation />
        <ActivityType />
        <DesiredAccuracy />
        <DeferLocUpdates />
        <PtsPerBatch />

      </SettingsContainer>
    );
  }
}

const styles = StyleSheet.create({

  header: {
    marginTop: 20
  },
  headerContent: {
    fontSize:18,
    marginBottom:20
  }

});

export default Settings;

import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ResumeGeofenceContainer from './components/resume-geofence-container';
import { ButtonGroup } from 'react-native-elements';

class ResumeGeofence extends React.Component {

  constructor () {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render() {
    const buttons = ['Off', '100m', '200m', '500m', '1km', '2km']
    const { selectedIndex } = this.state

    return (
      <ResumeGeofenceContainer>
      <Text style={{fontSize:16}}>Resume with Geofence</Text>
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{width:"90%"}}
    />
      </ResumeGeofenceContainer>
    );
  }
}

export default ResumeGeofence;

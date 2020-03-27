import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import DesiredAccuracyContainer from './components/desired-accuracy-container';
import { ButtonGroup } from 'react-native-elements';
//import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

class DesiredAccuracy extends React.Component {

  constructor () {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    /*BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH
    });*/
    this.setState({selectedIndex})
  }

  render() {
    const buttons = ['Nav', 'Best', '10m', '100m', '1km', '3km']
    const { selectedIndex } = this.state

    return (
      <DesiredAccuracyContainer>
      <Text style={{fontSize:16}}>Desired Accuracy</Text>
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{width:"90%"}}
    />
      </DesiredAccuracyContainer>
    );
  }
}

export default DesiredAccuracy;

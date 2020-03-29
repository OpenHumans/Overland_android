import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import DesiredAccuracyContainer from './components/desired-accuracy-container';
import { ButtonGroup } from 'react-native-elements';
import BackgroundGeolocation from "react-native-background-geolocation";
import AsyncStorage from '@react-native-community/async-storage';

class DesiredAccuracy extends React.Component {

  constructor (props) {
    super(props)
    console.log("DesiredAccuracy::constructor::",this.props.desiredAccuracy)
    this.buttons = ['Nav', 'Best', '10m', '100m', '1km', '3km']
    const _index = this.convBGIndexToUIIndex(this.props.desiredAccuracy);
    this.state = {
      selectedIndex: _index
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  convBGIndexToUIIndex(bgIndex) {
    let _index;
    switch (bgIndex) {
      case -2:
        _index = 0;
        break;
      case -1:
        _index = 1;
        break;
      case 10:
        _index = 2;
        break;
      case 100:
        _index = 3;
        break;
      case 1000:
        _index = 4;
        break;
      case 3000:
        _index = 5;
        break;
      default:
        _index = 1;
    }
    return _index;
  }

  updateIndex (selectedIndex) {

    let selectedAccuracy;
    switch (selectedIndex) {
      case 0:
        selectedAccuracy = BackgroundGeolocation.DESIRED_ACCURACY_NAVIGATION;
        break;
      case 1:
        selectedAccuracy = BackgroundGeolocation.DESIRED_ACCURACY_HIGH;
        break;
      case 2:
        selectedAccuracy = BackgroundGeolocation.DESIRED_ACCURACY_MEDIUM;
        break;
      case 3:
        selectedAccuracy = BackgroundGeolocation.DESIRED_ACCURACY_LOW;
        break;
      case 4:
        selectedAccuracy = BackgroundGeolocation.DESIRED_ACCURACY_VERY_LOW;
        break;
      case 5:
        selectedAccuracy = BackgroundGeolocation.DESIRED_ACCURACY_LOWEST;
        break;
      default:

    }
    BackgroundGeolocation.setConfig({
      desiredAccuracy: selectedAccuracy
    });
    this.setState({selectedIndex})
    this.storeData({name:"@desiredAccuracy",value:selectedAccuracy})
  }

  convAccuracyToIndex(nb) {
    return this.buttons.indexOf(nb);
  }

  async storeData (state) {
    try {
      console.log("storeData::",state.value);
      await AsyncStorage.setItem(String(state.name),String(state.value));
    } catch (error) {
      console.log("storeData::err::",error);
    }
  };

  render() {
    const { selectedIndex } = this.state

    return (
      <DesiredAccuracyContainer>
      <Text style={{fontSize:16}}>Desired Accuracy</Text>
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={this.buttons}
      containerStyle={{width:"90%"}}
    />
      </DesiredAccuracyContainer>
    );
  }
}

export default DesiredAccuracy;

import React from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import TrackerSwitchContainer from './components/tracker-switch-container';
import { ButtonGroup } from 'react-native-elements';
import BackgroundGeolocation from "react-native-background-geolocation";

class TrackerSwitch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }


  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
    if (selectedIndex==0){
      BackgroundGeolocation.start()
    }else {
      BackgroundGeolocation.stop()
    }
  }


  render() {

    const buttons = ['ON', 'OFF']
    const { selectedIndex } = this.state

    return (
      <TrackerSwitchContainer>
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{width:"90%",height: 48}}
    />
      </TrackerSwitchContainer>
    );
  }
}


export default TrackerSwitch;

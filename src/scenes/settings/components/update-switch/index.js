import React from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import UpdateSwitchContainer from './components/update-switch-container';
import BackgroundGeolocation from "react-native-background-geolocation";
import AsyncStorage from '@react-native-community/async-storage';

class UpdateSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopOnStationary: this.props.stopOnStationary,
    };

    this.onSwitchValueChange = this.onSwitchValueChange.bind(this);
  }

  onSwitchValueChange(e) {
    this.setState({
      stopOnStationary: e,
    });
    BackgroundGeolocation.setConfig({
      stopOnStationary: e
    });
    let s_stopOnStationary = e ? 'True':'False';
    this.storeData({name:"@stopOnStationary",value:s_stopOnStationary})

  }

  async storeData (state) {
    try {
      console.log("storeData::");
      await AsyncStorage.setItem(state.name,state.value);
    } catch (error) {
      console.log("storeData::err::",error);
    }
  };

  render() {
    const { stopOnStationary } = this.state;
    return (
      <UpdateSwitchContainer>
        <Text style={{fontSize: 16}}>Stop Tracking Automatically</Text>
        <Switch value={stopOnStationary} onValueChange={this.onSwitchValueChange} />
      </UpdateSwitchContainer>
    );
  }
}


export default UpdateSwitch;

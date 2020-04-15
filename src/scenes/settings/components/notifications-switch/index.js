import React from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import NotifSwitchContainer from './components/notif-switch-container';
import BackgroundGeolocation from "react-native-background-geolocation";
import AsyncStorage from '@react-native-community/async-storage';

class NotificationsSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSwitch: false,
    };
    this.onSwitchValueChange = this.onSwitchValueChange.bind(this);
  }
  componentDidMount(){
    BackgroundGeolocation.ready({}, (state) => {
      this.onSwitchValueChange(state.debug)
    });
  }

  onSwitchValueChange(e) {
    this.setState({
      toggleSwitch: e,
    });
    BackgroundGeolocation.setConfig({debug:e});
    this.storeData({name:"@debugNotification",value:e?'True':'False'})

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
    const { toggleSwitch } = this.state;
    return (
      <NotifSwitchContainer>
        <Text style={{fontSize: 16}}>Enable notifications</Text>
        <Switch value={toggleSwitch} onValueChange={this.onSwitchValueChange} />
      </NotifSwitchContainer>
    );
  }
}


export default NotificationsSwitch;

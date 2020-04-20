import React from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import NotifSwitchContainer from './components/notif-switch-container';
import BackgroundGeolocation from "react-native-background-geolocation";
import {storeData} from '../../../../utils/store';

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
    storeData({name:"@debugNotification",value:e==true?'True':'False'})

  }

  render() {
    const { toggleSwitch } = this.state;
    return (
      <NotifSwitchContainer>
        <Text style={{fontSize: 16}}>Enable audio notifications</Text>
        <Switch style={{ transform: [{ scaleX: 1.03 }, { scaleY: 1.03 }]}}  value={toggleSwitch} onValueChange={this.onSwitchValueChange} />
      </NotifSwitchContainer>
    );
  }
}


export default NotificationsSwitch;

import React from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import NotifSwitchContainer from './components/notif-switch-container';

class NotificationsSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSwitch: true,
    };
    this.onSwitchValueChange = this.onSwitchValueChange.bind(this);
  }

  onSwitchValueChange(e) {
    this.setState({
      toggleSwitch: e,
    });
  }

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

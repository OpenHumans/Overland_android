import React from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import TrackerSwitchContainer from './components/tracker-switch-container';

class TrackerSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSwitch: false,
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
      <TrackerSwitchContainer>
      <Text>Tracker {toggleSwitch ? 'On' : 'Off'}</Text>
      <Switch value={toggleSwitch} onValueChange={this.onSwitchValueChange} />

      </TrackerSwitchContainer>
    );
  }
}


export default TrackerSwitch;

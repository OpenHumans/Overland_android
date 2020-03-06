import React from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import UpdateSwitchContainer from './components/update-switch-container';

class UpdateSwitch extends React.Component {
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
      <UpdateSwitchContainer>
        <Text style={{fontSize: 16}}>Pause Update Automatically</Text>
        <Switch value={toggleSwitch} onValueChange={this.onSwitchValueChange} />
      </UpdateSwitchContainer>
    );
  }
}


export default UpdateSwitch;

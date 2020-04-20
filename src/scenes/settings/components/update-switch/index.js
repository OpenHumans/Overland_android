import React from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import UpdateSwitchContainer from './components/update-switch-container';
import BackgroundGeolocation from "react-native-background-geolocation";
import {storeData} from '../../../../utils/store';

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
    storeData({name:"@stopOnStationary",value:s_stopOnStationary})

  }

  render() {
    const { stopOnStationary } = this.state;
    return (
      <UpdateSwitchContainer>
        <Text style={{fontSize: 16}}>Stop Tracking Automatically</Text>
        <Switch style={{ transform: [{ scaleX: 1.03 }, { scaleY: 1.03 }]}}
        value={stopOnStationary} onValueChange={this.onSwitchValueChange} />
      </UpdateSwitchContainer>
    );
  }
}


export default UpdateSwitch;

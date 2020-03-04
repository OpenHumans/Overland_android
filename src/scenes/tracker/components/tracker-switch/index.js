import React from 'react';
import { Text, Button } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import TrackerSwitchContainer from './components/tracker-switch-container';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

class TrackerSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSwitch: false
    };
    this.onSwitchValueChange = this.onSwitchValueChange.bind(this);
    this.reconfig = this.reconfig.bind(this);
  }

  reconfig() {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 20,
      distanceFilter: 5,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: true,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 1000,
      fastestInterval: 1000,
      activitiesInterval: 1000,
      stopOnStillActivity: false,
      notificationsEnabled: false,
      startForeground: true,
      syncUrl: 'http://192.168.1.100:4000',
      url: 'http://192.168.1.100:4000',
      // customize post properties
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        foo: 'bar' // you can also add your own properties
      }
    });
    BackgroundGeolocation.getConfig(
      config => {
        console.log('config=======+>', config);
      },
      err => {
        console.log(err);
      }
    );
  }

  onSwitchValueChange(e) {
    this.setState({
      toggleSwitch: e
    });
  }

  render() {
    const { toggleSwitch } = this.state;
    return (
      <TrackerSwitchContainer>
        <Button title={'toto'} onPress={this.reconfig}>
          {'RECONFIG'}
        </Button>
        <Text>Tracker {toggleSwitch ? 'On' : 'Off'}</Text>
        <Switch value={toggleSwitch} onValueChange={this.onSwitchValueChange} />
      </TrackerSwitchContainer>
    );
  }
}

export default TrackerSwitch;

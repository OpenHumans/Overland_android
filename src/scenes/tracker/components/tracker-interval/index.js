import React from 'react';
import { Text, StyleSheet } from 'react-native';
import TrackerIntervalContainer from './components/tracker-interval-container';
import Slider from '@react-native-community/slider';
import BackgroundGeolocation from "react-native-background-geolocation";
import {storeData,fetchData} from '../../../../utils/store';

class TrackerInterval extends React.Component {
  constructor() {
    super()
    this.state = {
      interval: 60
    };
    this.onIntervalChange = this.onIntervalChange.bind(this);
  }
  async componentDidMount(){
    let _httpTimeout = await fetchData("httpTimeout");
    if(_httpTimeout){
      this.setState({interval:Math.floor(_httpTimeout/1000)})
    }
  }
  onIntervalChange(value) {
    const num = parseInt(value, 10);
    console.log('====>', num);
    this.setState({
      interval: num,
    });
    BackgroundGeolocation.setConfig({httpTimeout:num*1000})
    storeData({name:"@httpTimeout",value:String(num*1000)})
  }

  render() {
    const interval = this.state.interval;

    return (
      <TrackerIntervalContainer>
        <Text style={{marginTop:10}}>SEND INTERVAL</Text>
        <Text>
          {interval > 60
            ? `${parseInt(interval / 60, 10)} minutes`
            : `${interval} secondes`}
        </Text>
        <Slider
          onSlidingComplete={this.onIntervalChange}
          step={1}
          style={styles.slider}
          minimumValue={60}
          value={interval}
          maximumValue={1800}
          accessibilityLabel="Send Interval"
        />
      </TrackerIntervalContainer>
    );
  }
}

const styles = StyleSheet.create({
  slider: {
    width: 300,
    height: 48,
  },
});

export default TrackerInterval;

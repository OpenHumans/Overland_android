import React from 'react';
import { Text, StyleSheet } from 'react-native';
import TrackerIntervalContainer from './components/tracker-interval-container';
import Slider from '@react-native-community/slider';
import BackgroundGeolocation from "react-native-background-geolocation";
import AsyncStorage from '@react-native-community/async-storage';

class TrackerInterval extends React.Component {
  constructor() {
    super()
    this.state = {
      interval: 60
    };
    this.onIntervalChange = this.onIntervalChange.bind(this);
  }
  async componentDidMount(){
    let _httpTimeout = await this.fetchData("httpTimeout");
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
    BackgroundGeolocation.ready({httpTimeout:num*1000})
    this.storeData({name:"@httpTimeout",value:String(num*1000)})
  }
  async storeData (state) {
    try {
      console.log("storeData::");
      await AsyncStorage.setItem(state.name,state.value);
    } catch (error) {
      console.log("storeData::err::",error);
    }
  };
  async fetchData (name) {
   try {

     const value = await AsyncStorage.getItem('@'+name);
     console.log("fetchData::",'@'+name,value);
     if (value !== null) {
       return value;
     }
   } catch (error) {
     console.log("fetchData::err::",error);
   }
 };
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
        />
      </TrackerIntervalContainer>
    );
  }
}

const styles = StyleSheet.create({
  slider: {
    width: 300,
    height: 40,
  },
});

export default TrackerInterval;

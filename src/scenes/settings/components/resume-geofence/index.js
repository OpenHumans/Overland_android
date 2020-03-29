import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ResumeGeofenceContainer from './components/resume-geofence-container';
import { ButtonGroup } from 'react-native-elements';
import BackgroundGeolocation from "react-native-background-geolocation";
import AsyncStorage from '@react-native-community/async-storage';

class ResumeGeofence extends React.Component {

  constructor () {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    if(selectedIndex>0){
      BackgroundGeolocation.startGeofences(()=>{
        console.log("- Start GeoFences success");
      });
    }else{
      BackgroundGeolocation.stop();
      BackgroundGeolocation.start();
      console.log("- Stop GeoFences success");
    }
    switch (selectedIndex) {
      case 1:
        BackgroundGeolocation.ready({geofenceProximityRadius:100},(state)=>{
          console.log(state);
        });
        break;
      case 2:
        BackgroundGeolocation.ready({geofenceProximityRadius:200},(state)=>{
          console.log(state);
        });
        break;
      case 3:
        BackgroundGeolocation.ready({geofenceProximityRadius:500},(state)=>{
          console.log(state);
        });
        break;
      case 4:
        BackgroundGeolocation.ready({geofenceProximityRadius:1000},(state)=>{
          console.log(state);
        });
        break;
      case 5:
        BackgroundGeolocation.ready({geofenceProximityRadius:2000},(state)=>{
          console.log(state);
        });
        break;
      default:
        BackgroundGeolocation.ready({geofenceProximityRadius:1000},(state)=>{
          console.log(state);
        });

    }
    this.setState({selectedIndex})
  }

  render() {
    const buttons = ['Off', '100m', '200m', '500m', '1km', '2km']
    const { selectedIndex } = this.state

    return (
      <ResumeGeofenceContainer>
      <Text style={{fontSize:16}}>Resume with Geofence</Text>
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{width:"90%"}}
    />
      </ResumeGeofenceContainer>
    );
  }
}

export default ResumeGeofence;

import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ResumeGeofenceContainer from './components/resume-geofence-container';
import { ButtonGroup } from 'react-native-elements';
import BackgroundGeolocation from "react-native-background-geolocation";
import {storeData} from '../../../../utils/store';

class ResumeGeofence extends React.Component {

  constructor (props) {
    super(props)
    this.buttons = ['Off', '100m', '200m', '500m', '1km', '2km'];
    let _index = this.convRadiusToIndex(this.props.geofenceProximityRadius)
    console.log("ResumeGeofence::",_index);
    if(!_index) _index=0;
    this.state = {
      selectedIndex: _index
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  convRadiusToIndex(radius){
    switch (radius) {
      case '100':
        this.setState({selectedIndex:1});
        break;
      case '200':
        this.setState({selectedIndex:2});
        break;
      case '500':
        this.setState({selectedIndex:3});
        break;
      case '1000':
        this.setState({selectedIndex:4});
        break;
      case '2000':
        this.setState({selectedIndex:5});
        break;
      default:
        this.setState({selectedIndex:0});
    }
  }
  updateIndex (selectedIndex) {
    let _geofenceProximityRadius=1000;
    switch (selectedIndex) {
      case 1:
        _geofenceProximityRadius = '100';
        BackgroundGeolocation.setConfig({geofenceProximityRadius:100});
        break;
      case 2:
        _geofenceProximityRadius = '200';
        BackgroundGeolocation.setConfig({geofenceProximityRadius:200});
        break;
      case 3:
        _geofenceProximityRadius = '500';
        BackgroundGeolocation.setConfig({geofenceProximityRadius:500});
        break;
      case 4:
        _geofenceProximityRadius = '1000';
        BackgroundGeolocation.setConfig({geofenceProximityRadius:1000});
        break;
      case 5:
        _geofenceProximityRadius = '1000';
        BackgroundGeolocation.setConfig({geofenceProximityRadius:2000});
        break;
      default:
        _geofenceProximityRadius = 'off';
        BackgroundGeolocation.setConfig({geofenceProximityRadius:1000});

    }

    this.setState({selectedIndex})
    storeData({name:"@geofenceProximityRadius",value:_geofenceProximityRadius})
  }


  render() {

    const { selectedIndex } = this.state

    return (
      <ResumeGeofenceContainer>
      <Text style={{fontSize:16}}>Resume with Geofence</Text>
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={this.buttons}
      containerStyle={{width:"90%",height:48}}
    />
      </ResumeGeofenceContainer>
    );
  }
}

export default ResumeGeofence;

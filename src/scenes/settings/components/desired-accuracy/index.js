import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import DesiredAccuracyContainer from './components/desired-accuracy-container';
import { ButtonGroup } from 'react-native-elements';
import BackgroundGeolocation from "react-native-background-geolocation";
import {storeData} from '../../../../utils/store';

class DesiredAccuracy extends React.Component {

  constructor (props) {
    super(props)
    console.log("DesiredAccuracy::constructor::",this.props.desiredAccuracy)
    this.buttons = ['Nav', 'Best', '10m', '100m', '1km', '3km']
    const _index = this.convBGIndexToUIIndex(this.props.desiredAccuracy);
    this.state = {
      selectedIndex: _index
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  convBGIndexToUIIndex(bgIndex) {
    let _index;
    switch (bgIndex) {
      case -2:
        _index = 0;
        break;
      case -1:
        _index = 1;
        break;
      case 10:
        _index = 2;
        break;
      case 100:
        _index = 3;
        break;
      case 1000:
        _index = 4;
        break;
      case 3000:
        _index = 5;
        break;
      default:
        _index = 1;
    }
    return _index;
  }

  updateIndex (selectedIndex) {

    let selectedAccuracy;
    switch (selectedIndex) {
      case 0:
        selectedAccuracy = BackgroundGeolocation.DESIRED_ACCURACY_NAVIGATION;
        break;
      case 1:
        selectedAccuracy = BackgroundGeolocation.DESIRED_ACCURACY_HIGH;
        break;
      case 2:
        selectedAccuracy = BackgroundGeolocation.DESIRED_ACCURACY_MEDIUM;
        break;
      case 3:
        selectedAccuracy = BackgroundGeolocation.DESIRED_ACCURACY_LOW;
        break;
      case 4:
        selectedAccuracy = BackgroundGeolocation.DESIRED_ACCURACY_VERY_LOW;
        break;
      case 5:
        selectedAccuracy = BackgroundGeolocation.DESIRED_ACCURACY_LOWEST;
        break;
      default:
        selectedAccuracy = BackgroundGeolocation.DESIRED_ACCURACY_HIGH;
    }
    BackgroundGeolocation.ready({
      desiredAccuracy: selectedAccuracy
    },()=>{this.updateLocationTemplate()});
    this.setState({selectedIndex})
    storeData({name:"@desiredAccuracy",value:String(selectedAccuracy)})
  }

  updateLocationTemplate(){
    BackgroundGeolocation.ready({}, (state) => {
        let _templateSignificantChangesOnly = state.useSignificantChangesOnly;
        let _deferTime = state.deferTime
        let _deviceIdSync = state.device_id
        let _desiredAccuracy = Number(state.desiredAccuracy)<0?0:Number(state.desiredAccuracy);
        let _wifiInfo = global.wifiInfo.ssid;
        if(!_wifiInfo) _wifiInfo = "";
        let _template = '{\
          "type": "Feature", \
          "geometry": { \
            "type": "Point",    \
            "coordinates": [      <%=longitude%>,      <%=latitude%>    ]  },\
          "properties": {    \
            "timestamp": "<%= timestamp %>",    \
            "battery_level": <%=battery.level%>,    \
            "speed": <%=speed%>, \
            "altitude": <%=altitude%>,\
            "horizontal_accuracy": <%=accuracy%>,\
            "vertical_accuracy": <%=altitude_accuracy%>,\
            "significant_change": \"'+_templateSignificantChangesOnly+'\" ,\
            "locations_in_payload": 1,\
            "battery_state": <%=battery.is_charging%>,\
            "device_id": \"'+ _deviceIdSync +'\" ,\
            "wifi": \"'+ _wifiInfo +'\" ,\
            "deferred": \"'+_deferTime+'\",\
            "desired_accuracy": \"'+ _desiredAccuracy +'\",\
            "activity": "other",\
            "pauses": <%=is_moving%>,\
            "motion": ["<%=activity.type%>"]\
          }\
        }';
        BackgroundGeolocation.setConfig({locationTemplate:_template})
    })
  };

  convAccuracyToIndex(nb) {
    return this.buttons.indexOf(nb);
  }

  render() {
    const { selectedIndex } = this.state

    return (
      <DesiredAccuracyContainer>
      <Text style={{fontSize:16}}>Desired Accuracy</Text>
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={this.buttons}
      containerStyle={{width:"90%",height:48}}
    />
      </DesiredAccuracyContainer>
    );
  }
}

export default DesiredAccuracy;

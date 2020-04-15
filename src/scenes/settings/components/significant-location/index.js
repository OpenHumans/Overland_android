import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import SignificantLocationContainer from './components/significant-location-container'
import { ButtonGroup } from 'react-native-elements';
import BackgroundGeolocation from "react-native-background-geolocation";
import AsyncStorage from '@react-native-community/async-storage';

class SignificantLocation extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: this.props.useSignificantChangesOnly?1:0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    let _useSignificantChangesOnly = false;
    if(selectedIndex==0){
      _useSignificantChangesOnly = false;
    }else{
      _useSignificantChangesOnly = true;
    }
    let templateSignificantChangesOnly = _useSignificantChangesOnly ==='True' ? "enabled":"disabled";
    this.setState({selectedIndex})
    BackgroundGeolocation.ready({
      useSignificantChangesOnly:_useSignificantChangesOnly
    },()=>{this.updateLocationTemplate()});
    this.storeData({name:"@useSignificantChangesOnly",value:_useSignificantChangesOnly?'True':'False'})
  }

  updateLocationTemplate(){
    BackgroundGeolocation.ready({}, (state) => {
        let _templateSignificantChangesOnly = state.useSignificantChangesOnly;
        let _deferTime = state.deferTime
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
            "device_id": "",\
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


  async storeData (state) {
    try {
      console.log("storeData::");
      await AsyncStorage.setItem(state.name,state.value);
    } catch (error) {
      console.log("storeData::err::",error);
    }
  };

  render() {
    const buttons = ['Disabled', 'Enabled']
    const { selectedIndex } = this.state

    return (
      <SignificantLocationContainer>
      <Text style={{fontSize:16}}>Significant Location</Text>
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{width:"90%"}}
    />
      </SignificantLocationContainer>
    );
  }
}

export default SignificantLocation;

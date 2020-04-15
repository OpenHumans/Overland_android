import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import DeferLocUpdatesContainer from './components/defer-location-updates-container';
import { ButtonGroup } from 'react-native-elements';
import BackgroundGeolocation from "react-native-background-geolocation";
import AsyncStorage from '@react-native-community/async-storage';

class DeferLocUpdates extends React.Component {

  constructor (props) {
    super(props)
    let _index = this.convDeferTimeToIndex(this.props.deferTime)
    this.state = {
      selectedIndex: _index
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    let _deferTime;
    this.setState({selectedIndex})
    switch (selectedIndex) {
      case 0:
        _deferTime = 0;
        break;
      case 1:
        _deferTime = 60000;
        break;
      case 2:
        _deferTime = 300000;
        break;
      case 3:
        _deferTime = 3000000;
        break;
      case 4:
        _deferTime = 6000000;
        break;
      default:
        _deferTime = 0;
    }
    BackgroundGeolocation.ready({
      deferTime: _deferTime
    },()=>{
      this.updateLocationTemplate()
    });
    this.storeData({name:"@deferTime",value:String(_deferTime)})
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

  convDeferTimeToIndex(time){
    let _index;
    switch (time) {
      case 0:
        _index = 0;
        break;
      case 60000:
        _index = 1;
        break;
      case 300000:
        _index = 2;
        break;
      case 3000000:
        _index = 3;
        break;
      case 6000000:
        _index = 4;
        break;
      default:
        _index = 0;
    }
    return _index;
  }

  async storeData (state) {
    try {
      console.log("storeData::",state.value);
      await AsyncStorage.setItem(String(state.name),String(state.value));
    } catch (error) {
      console.log("storeData::err::",error);
    }
  };

  render() {
    const buttons = ['Never', '1 min', '5 min', '10 min', '20 min']
    const { selectedIndex } = this.state

    return (
      <DeferLocUpdatesContainer>
      <Text style={{fontSize:16}}>Defer Location Updates</Text>
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{width:"90%"}}
    />
      </DeferLocUpdatesContainer>
    );
  }
}

export default DeferLocUpdates;

import React from 'react';
import {Component} from 'react';
import { Alert, InteractionManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import AppNavigation from './src/components/app-navigation';
import {Spinner} from 'native-base';
import BackgroundGeolocation, {
  State,
  Config,
  Location,
  LocationError,
  Geofence,
  HttpEvent,
  MotionActivityEvent,
  ProviderChangeEvent,
  MotionChangeEvent,
  GeofenceEvent,
  GeofencesChangeEvent,
  HeartbeatEvent,
  ConnectivityChangeEvent,
  DeviceSettings, DeviceSettingsRequest,
  Notification,
  DeviceInfo,
  Authorization, AuthorizationEvent,
  TransistorAuthorizationToken
} from "react-native-background-geolocation";

import NetInfo from "@react-native-community/netinfo";

console.disableYellowBox = true;

console.log('====================================================');

if (!__DEV__) {
  console.log = () => {};
}


class Application extends Component {
  constructor(){
    super()
    this.state = {loading: true};
    global.wifiInfo = {"ssid":""};
  }

  async componentDidMount() {


    const unsubscribe = NetInfo.addEventListener(state => {
      if (__DEV__) {
        console.log("Connection type", state.type);
        console.log("SSID", state.details.ssid);
        console.log("Is connected?", state.isConnected);
      }
      if(state.type=="wifi"){
        global.wifiInfo.ssid = state.details.ssid;
      }else{
        global.wifiInfo.ssid = "";
      }
      this.updateLocationTemplate();
    });

    ////
    // 1.  Wire up event-listeners
    //

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.onLocation(this.onLocation, this.onError);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.onMotionChange(this.onMotionChange);

    // This event fires when a change in motion activity is detected
    BackgroundGeolocation.onActivityChange(this.onActivityChange);

    // This event fires when the user toggles location-services authorization
    BackgroundGeolocation.onProviderChange(this.onProviderChange);

    BackgroundGeolocation.onHttp(httpEvent => {
      if (__DEV__) {
        console.log("[http] ", httpEvent.success, httpEvent.status,httpEvent.responseText);
      }
    });
    BackgroundGeolocation.onHeartbeat((event) => {
      if (__DEV__) {
        console.log("[onHeartbeat] ", event);
      }
    });

    let _autoSyncThreshold = await this.fetchData ('autoSyncThreshold');
    if(!_autoSyncThreshold) _autoSyncThreshold = 100;
    else _autoSyncThreshold = Number(_autoSyncThreshold);
    let _urlSync = await this.fetchData ('url');
    if(!_urlSync) _urlSync = 'https://';
    let s_debugNotification = await this.fetchData ('debugNotification');
    if(!s_debugNotification) s_debugNotification = 'False';
    let _debugNotification = s_debugNotification==="True"?true:false;
    let s_desiredAccuracy = await this.fetchData ('desiredAccuracy');
    if(!s_desiredAccuracy) s_desiredAccuracy = BackgroundGeolocation.DESIRED_ACCURACY_HIGH;
    let _desiredAccuracy = Number(s_desiredAccuracy)<0?0:Number(s_desiredAccuracy);
    let _httpTimeout = await this.fetchData ('httpTimeout');
    if(!_httpTimeout) _httpTimeout = 60000;
    else _httpTimeout = Number(_httpTimeout);
    let _useSignificantChangesOnly = await this.fetchData ('useSignificantChangesOnly');
    if(!_useSignificantChangesOnly) _useSignificantChangesOnly = 'False';
    //_useSignificantChangesOnly is a string "False" or "True"
    _useSignificantChangesOnly = _useSignificantChangesOnly=='True' ? true:false;
    let _templateSignificantChangesOnly = _useSignificantChangesOnly ? "enabled":"disabled";
    let _stopOnStationary = await this.fetchData ('stopOnStationary');
    if(!_stopOnStationary) _stopOnStationary = "False";
    _stopOnStationary = _stopOnStationary=='True' ? true:false;
    let _deferTime = await this.fetchData ('deferTime');
    if(!_deferTime) _deferTime = 0;
    else _deferTime = Number(_deferTime);
    let _wifiInfo = global.wifiInfo.ssid;
    if(!_wifiInfo) _wifiInfo = "";

    let s_geofenceProximityRadius = await this.fetchData ('geofenceProximityRadius');
    let _geofenceProximityRadius;
    if(!s_geofenceProximityRadius) _geofenceProximityRadius = 1000;
    else{
      _geofenceProximityRadius = s_geofenceProximityRadius ==='off'?1000:Number(s_geofenceProximityRadius) ;
      console.log("_geofenceProximityRadius :: ",_geofenceProximityRadius)
    }
    //
    // 2.  Execute #ready method to initiate
    //
    BackgroundGeolocation.ready({
      desiredAccuracy: _desiredAccuracy,
      activityType: BackgroundGeolocation.ACTIVITY_TYPE_OTHER,
      heartbeatInterval: 60,
      distanceFilter: 5,
      locationUpdateInterval: 10000,  // Get a location every 5 seconds
      deferTime: _deferTime,
      useSignificantChangesOnly: _useSignificantChangesOnly,
      stopOnStationary: false,//_stopOnStationary,
      // Activity Recognition
      // Application config
      debug: _debugNotification, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,

      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: _urlSync,
      batchSync: true,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      autoSyncThreshold: _autoSyncThreshold,
      maxBatchSize: 2000,
      httpTimeout: _httpTimeout,
      //httpTimeout: _httpTimeout,
      geofenceProximityRadius: 500,
      httpRootProperty: 'locations',
      locationTemplate: '{\
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
      }',
      notification: {
        channelName: "Allow Notification of Location Tracker"
      }
    }, (state) => {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
      console.log(state)
      this.setState({loading:false})

      if (!state.enabled) {
        ////
        // 3. Start tracking!
        //
        BackgroundGeolocation.start(function() {
          if (__DEV__) {
            console.log("- Start success");
          }
        });
      }
    });

  }

  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    BackgroundGeolocation.removeListeners();
  }
  onLocation(location) {
    //console.log('[location] -', location);
  }
  onError(error) {
    if (__DEV__) {
      console.warn('[location] ERROR -', error);
    }
  }
  async onActivityChange(event) {
    if (__DEV__) {
      console.log('[activitychange] -', event);  // eg: 'on_foot', 'still', 'in_vehicle'
    }
  }

  onProviderChange(provider) {
    if (__DEV__) {
      console.log('[providerchange] -', provider.enabled, provider.status);
    }
    BackgroundGeolocation.changePace(true);
  }
  onMotionChange(event) {
    if (__DEV__) {
      console.log('[motionchange] -', event.isMoving, event.location);
    }
  }

   async fetchData (name) {
    try {

      const value = await AsyncStorage.getItem('@'+name);
      if (__DEV__) {
        console.log("fetchData::",'@'+name,value);
      }
      if (value !== null) {
        return value;
      }
    } catch (error) {
        if (__DEV__) {
          console.log("fetchData::err::",error);
        }
    }
  };

  updateLocationTemplate(){
    BackgroundGeolocation.ready({}, (state) => {
        let _templateSignificantChangesOnly = state.useSignificantChangesOnly;
        let _deferTime = state.deferTime
        let _desiredAccuracy = state.desiredAccuracy;
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



  render() {
    const isLoading = this.state.loading;
    return (<>{ isLoading ? <Spinner/> : <AppNavigation /> }</>);

  }
}


const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <Application />
      </NavigationContainer>
    </>
  );
};

export default App;

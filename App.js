import React from 'react';
import {Component} from 'react';
import { Alert, InteractionManager, View, Text, BackHandler, Linking  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {storeData,fetchData} from './src/utils/store';

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
import Dialog from "react-native-dialog";
import AFicons from 'react-native-vector-icons/FontAwesome';

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
    global.wifiInfo = {"ssid":""}
    //global.isConnected = false;
  }

  async componentDidMount() {


    const unsubscribe = NetInfo.addEventListener(state => {
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

    let _autoSyncThreshold = await fetchData ('autoSyncThreshold');
    if(!_autoSyncThreshold) _autoSyncThreshold = 100;
    else _autoSyncThreshold = Number(_autoSyncThreshold);
    let _urlSync = await fetchData ('url');
    if(!_urlSync) _urlSync = 'https://';
    let _deviceIdSync = await fetchData ('device_id');
    if(!_deviceIdSync) _deviceIdSync = '';
    let s_debugNotification = await fetchData ('debugNotification');
    if(!s_debugNotification) s_debugNotification = 'False';
    let _debugNotification = s_debugNotification==="True"?true:false;
    let s_desiredAccuracy = await fetchData ('desiredAccuracy');
    if(!s_desiredAccuracy) s_desiredAccuracy = BackgroundGeolocation.DESIRED_ACCURACY_HIGH;
    let _desiredAccuracy = Number(s_desiredAccuracy)<0?0:Number(s_desiredAccuracy);
    let _httpTimeout = await fetchData ('httpTimeout');
    if(!_httpTimeout) _httpTimeout = 60000;
    else _httpTimeout = Number(_httpTimeout);
    let _useSignificantChangesOnly = await fetchData ('useSignificantChangesOnly');
    if(!_useSignificantChangesOnly) _useSignificantChangesOnly = 'False';
    //_useSignificantChangesOnly is a string "False" or "True"
    _useSignificantChangesOnly = _useSignificantChangesOnly=='True' ? true:false;
    let _templateSignificantChangesOnly = _useSignificantChangesOnly ? "enabled":"disabled";
    let _stopOnStationary = await fetchData ('stopOnStationary');
    if(!_stopOnStationary) _stopOnStationary = "False";
    _stopOnStationary = _stopOnStationary=='True' ? true:false;
    let _deferTime = await fetchData ('deferTime');
    if(!_deferTime) _deferTime = 0;
    else _deferTime = Number(_deferTime);
    let _wifiInfo = global.wifiInfo.ssid;
    if(!_wifiInfo) _wifiInfo = "";

    let s_geofenceProximityRadius = await fetchData ('geofenceProximityRadius');
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
      stopTimeout: 10,
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
          "device_id": \"'+ _deviceIdSync +'\" ,\
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

  updateLocationTemplate(){
    BackgroundGeolocation.ready({}, (state) => {
        let _templateSignificantChangesOnly = state.useSignificantChangesOnly;
        let _deferTime = state.deferTime;
        let _desiredAccuracy = state.desiredAccuracy;
        let _deviceIdSync = state.device_id;
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



  render() {
    const isLoading = this.state.loading;
    return (<>{ isLoading ? <Spinner/> : <AppNavigation /> }</>);

  }
}


//Mise en conformité avec les règles relative à la geolocalisation de l'App Store de Google
class NotificationLocalisation extends Component {
  constructor(){
    super()
    this.state = {userIsNotInformed: true};
  }
  async componentDidMount() {
    let _userIsNotInformed = await fetchData ('userIsNotInformed');//return a string
    if (__DEV__) {
      console.log("value of _userIsNotInformed :: ", _userIsNotInformed, typeof _userIsNotInformed )
    }
    //init for the first launch of the app
    if(_userIsNotInformed == undefined ) {
      this.state.userIsNotInformed = true;
      await storeData({name:"@userIsNotInformed",value:this.state.userIsNotInformed.toString()})//convert to string
    }else {
      _userIsNotInformed = (_userIsNotInformed === 'true');//convert to boolean
      await this.setState({ userIsNotInformed: _userIsNotInformed });//save in state like boolean
    }
  }

  handleStart = async () => {
  await this.setState({ userIsNotInformed: false });//save in temporary state like boolean
  storeData({name:"@userIsNotInformed",value:this.state.userIsNotInformed.toString()})//save in local data like string
  };
  handleQuit = async () => {
  await this.setState({ userIsNotInformed: true });//save in temporary state like boolean
  storeData({name:"@userIsNotInformed",value:this.state.userIsNotInformed.toString()})//save in local data like string
  BackHandler.exitApp();
  };

  render() {
    const userIsNotInformed = this.state.userIsNotInformed;
    return (<>
        <>{ userIsNotInformed ?
        <Dialog.Container visible={this.state.userIsNotInformed} contentStyle={{backgroundColor: '#f8f8f8'}}>
        <View style={{paddingHorizontal: 12}}>
          <AFicons style={{textAlign: 'center',marginBottom: 20}} size={52} name={"map-marker"} />
          <Dialog.Title style={{textAlign: 'center',fontWeight:"bold",fontSize:20}}>Use your location</Dialog.Title>
          <Dialog.Description style={{lineHeight: 16,textAlign: 'center'}}>
            The app Overland collects location data to enable position tracking even when the app is closed or not in use.
            Location data is collected on your device and is not sent to a server. You can send location data to any server you choose.
            If you choose, in the next step, to send the location data collected by Overland to an Openhumans Foundation server, then you agree to the collection and use of the information in accordance with the policy described via this link. 

          </Dialog.Description>
          <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 16, textDecorationLine: 'underline',marginTop: 20,marginBottom: 20,color: "#007ff9"}}
            onPress={() => {Linking.openURL('http://openhumansfoundation.org/Overland_android/privacy_policy.html')}}>
            Access to privacy policy
          </Text>
          </View>
          <View style={{marginTop:28,marginBottom: 14,flexDirection: 'row', alignItems: 'center',justifyContent:'space-between'}} >
            <Dialog.Button label="No Thanks" onPress={this.handleQuit} style={{fontWeight:"bold"}} wrapperStyle={{height: 52}} color="#007ff9"/>
            <Dialog.Button label="Turn On" onPress={this.handleStart}  style={{backgroundColor: '#007ff9',borderRadius:5,paddingHorizontal:18,paddingVertical:14,fontWeight:"bold"}} wrapperStyle={{height: 52}} color="#fff"/>
          </View>
        </View>
        </Dialog.Container> : <Application/>  }
        </>
        </>
      );
      }
};


const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <NotificationLocalisation />
      </NavigationContainer>
    </>
  );
};

export default App;

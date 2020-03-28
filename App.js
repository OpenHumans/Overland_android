import React from 'react';
import {Component} from 'react';
import { Alert, InteractionManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import AppNavigation from './src/components/app-navigation';
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

console.disableYellowBox = true;

console.log('====================================================');

class Application extends Component {

  async componentDidMount() {
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

    ////
    // 2.  Execute #ready method (required)
    //
    let _autoSyncThreshold = await this.fetchData ('autoSyncThreshold');
    if(!_autoSyncThreshold) _autoSyncThreshold = 100;
    let _urlSync = await this.fetchData ('url');
    if(!_urlSync) _urlSync = 'http://';

    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      activityType: BackgroundGeolocation.ACTIVITY_TYPE_OTHER,
      distanceFilter: 5,
      locationUpdateInterval: 5000,  // Get a location every 5 seconds
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: _urlSync,
      batchSync: true,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      autoSyncThreshold: _autoSyncThreshold,
      maxBatchSize: 10000,
      deferTime: 1000,
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
          "significant_change": "disabled",\
          "locations_in_payload": 1,\
          "battery_state": <%=battery.is_charging%>,\
          "device_id": "",\
          "wifi": "" ,\
          "deferred": 1000,\
          "desired_accuracy": 100,\
          "activity": <%=activity.type%>,\
          "pauses": <%=is_moving%>,\
          "motion": ["driving","stationary"]\
        }\
      }'
    }, (state) => {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        ////
        // 3. Start tracking!
        //
        BackgroundGeolocation.start(function() {
          console.log("- Start success");

        });
      }
    });

  }

  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    BackgroundGeolocation.removeListeners();
  }
  onLocation(location) {
    console.log('[location] -', location);
  }
  onError(error) {
    console.warn('[location] ERROR -', error);
  }
  onActivityChange(event) {
    console.log('[activitychange] -', event);  // eg: 'on_foot', 'still', 'in_vehicle'
  }

  onProviderChange(provider) {
    console.log('[providerchange] -', provider.enabled, provider.status);
  }
  onMotionChange(event) {
    console.log('[motionchange] -', event.isMoving, event.location);
  }

   async fetchData (name) {
    try {

      const value = await AsyncStorage.getItem('@'+name);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log("fetchData::err::",error);
    }
  };


  render() {
    return <AppNavigation />;
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

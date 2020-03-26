import React from 'react';
import {Component} from 'react';
import { Alert, InteractionManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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

  /*
  componentWillUnmount() {
    BackgroundGeolocation.removeAllListeners();
  }

  componentDidMount() {
    console.log('MMMMMMMMMMMMMMMOUNT');
    // InteractionManager.runAfterInteractions(() => {
    // BackgroundGeolocation.stop();
    console.log('RUNNING FOR LOCATIONNNNN');
    BackgroundGeolocation.getLocations(
      locations => {
        console.log('locationsS WHEN ABSENT=>', locations);
      },
      error => {
        console.log('ERR', error);
      }
    );
    // RESET FOR DEV =>
    // BackgroundGeolocation.stop();
    BackgroundGeolocation.getValidLocations(
      locations => {
        console.log('VALID LOC WHEN ABSENT=>', locations);
      },
      error => {
        console.log('ERR', error);
      }
    );
    // });
    BackgroundGeolocation.getConfig(
      config => {
        console.log('config=======+>', config);
      },
      err => {
        console.log(err);
      }
    );
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 20,
      distanceFilter: 5,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: true,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 5000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      notificationsEnabled: false,
      startForeground: true,
      syncThreshold: 500,
      syncUrl: '',// https://overland.openhumans.org/5ye71az9mu/
      url: '', // http://192.168.1.100:4000
      // customize post properties
      postTemplate: {
        "locations": [
           {
             "type": "Feature",
             "geometry": {
               "type": "Point",
               "coordinates": [
                 '@latitude',
                 '@longitude'
               ]
             }
           }
         ]
     },
    });
    BackgroundGeolocation.configure({
      postTemplate: ['@latitude', '@longitude']
    });
    BackgroundGeolocation.checkStatus(status => {
      console.log('==>STATUTS+<', status);
      if (!status.isRunning) {
        console.log('BACKGEO was not running......;');

        BackgroundGeolocation.start();
      }
    });

    // BackgroundGeolocation.on('error', error => {
    //   console.log('[ERROR] BackgroundGeolocation error:', error);
    // });

    BackgroundGeolocation.on('location', location => {
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      console.log('CURRENT LOCATION>', location);
       BackgroundGeolocation.startTask(async (taskKey) => {
         let res = await this.postBatchLocations();
         if(res){
           this.deleteAllData();
         }

       BackgroundGeolocation.endTask(taskKey);
       });
    });
  }

  deleteAllData (){
    BackgroundGeolocation.deleteAllLocations();
    this.setState({lastSent: '00:00', queueSize: '0' ,diffDateLastLocation: '-',speed: '-',latitude: '--',longitude: '--',accuracy: '--', selectedLocationId: -1, isReady: false });
  }

  postBatchLocations() {

      return new Promise(resolve => {

        let arr_locations = []
        BackgroundGeolocation.getValidLocations((locations) => {
            if(locations.length<5) return false;
            locations.forEach((location)=> {
              arr_locations.push({
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    location.longitude,
                    location.latitude
                  ]
                },
                "properties": {
                  "timestamp": new Date(location.time),
                  "altitude": location.altitude,
                  "speed": location.speed,
                  "horizontal_accuracy": location.accuracy,
                  "vertical_accuracy": -1,
                  "motion": ["driving","stationary"],
                  "pauses": false,
                  "activity": "other_navigation",
                  "desired_accuracy": location.radius,
                  "deferred": -1,
                  "significant_change": "disabled",
                  "locations_in_payload": 1,
                  "battery_state": "charging",
                  "battery_level": -1,
                  "device_id": "",
                  "wifi": ""
                }
              });
            })

            resolve(fetch('https://overland.openhumans.org/5ye71az9mu/', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  "locations": arr_locations
                }),
            }).then((response)=>{
                return response.ok
            }));

          });
      });
  }*/

  componentDidMount() {
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


    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
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
      url: 'https://overland.openhumans.org/5ye71az9mu/',
      batchSync: true,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      autoSyncThreshold: 100,
      maxBatchSize: 10000,
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

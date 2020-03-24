import React from 'react';
import { Alert, InteractionManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/components/app-navigation';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

console.log('====================================================');

class Application extends React.PureComponent {
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

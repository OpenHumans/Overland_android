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
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      notificationsEnabled: false,
      startForeground: true,
      syncThreshold: 500,
      syncUrl: 'http://192.168.0.26', //http://10.0.2.2
      url: 'http://192.168.0.26', // http://192.168.1.100:4000
      // customize post properties
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        foo: 'bar' // you can also add your own properties
      }
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
      // BackgroundGeolocation.startTask(taskKey => {
      //   // execute long running task
      //   // eg. ajax post location
      //   // IMPORTANT: task has to be ended by endTask
      //   BackgroundGeolocation.endTask(taskKey);
      // });
    });

    // });
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

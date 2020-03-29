import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ActivityTypeContainer from './components/activity-type-container'
import { ButtonGroup } from 'react-native-elements';
import BackgroundGeolocation from "react-native-background-geolocation";

var {Platform} = React;

class ActivityType extends React.Component {

  constructor (props) {
    super(props)
    this.buttons = ['Other', 'Fitness', 'Automotive', 'Other Nav']
    this.state = {
      selectedIndex: 0
    }
    this.disabledButtonGroup =  (Platform.OS === 'ios') ? false : true;
    this.updateIndex = this.updateIndex.bind(this)
  }

  convActivityToIndex(activity) {
    let current_index = 0;
    switch(activity) {
      case BackgroundGeolocation.ACTIVITY_TYPE_OTHER:
        // Other
        current_index = 0;
        break;
      case BackgroundGeolocation.ACTIVITY_TYPE_FITNESS:
        // Fitness
        current_index = 1;
        break;
      case BackgroundGeolocation.ACTIVITY_TYPE_AUTOMOTIVE_NAVIGATION:
        // Automotive
        current_index = 2;
        break;
      case BackgroundGeolocation.ACTIVITY_TYPE_OTHER_NAVIGATION:
        // Automotive
        current_index = 3;
        break;
      default:
        current_index = 0;
        // other
    }
    return current_index;
  }

  updateIndex (selectedIndex) {
    let current_activity = BackgroundGeolocation.ACTIVITY_TYPE_OTHER;
    switch(selectedIndex) {
      case 0:
        // Other
        current_activity = BackgroundGeolocation.ACTIVITY_TYPE_OTHER;
        break;
      case 1:
        // Fitness
        current_activity = BackgroundGeolocation.ACTIVITY_TYPE_FITNESS;
        break;
      case 2:
        // Automotive
        current_activity = BackgroundGeolocation.ACTIVITY_TYPE_AUTOMOTIVE_NAVIGATION;
        break;
      case 3:
        // Automotive
        current_activity = BackgroundGeolocation.ACTIVITY_TYPE_OTHER_NAVIGATION;
        break;
      default:
        current_activity = BackgroundGeolocation.ACTIVITY_TYPE_OTHER;
        // other
    }
    BackgroundGeolocation.setConfig({
      activityType: current_activity
    });

    this.setState({selectedIndex})

  }

  render() {

    const { selectedIndex } = this.state

    return (
      <ActivityTypeContainer>
      <Text style={{fontSize:16}}>Activity Type</Text>
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={this.buttons}
      disabled={this.disabledButtonGroup}
      containerStyle={{width:"90%"}}
    />
      </ActivityTypeContainer>
    );
  }
}

export default ActivityType;

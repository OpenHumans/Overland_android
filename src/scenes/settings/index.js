import React, { PureComponent }  from 'react';
import { Text,StyleSheet,View, ScrollView, Content } from 'react-native';
import SettingsContainer from './components/settings-container';
import SignificantLocation from './components/significant-location';
import ActivityType from './components/activity-type';
import DesiredAccuracy from './components/desired-accuracy';
import DeferLocUpdates from './components/defer-location-updates';
import PtsPerBatch from './components/point-per-batch';
import UpdateSwitch from './components/update-switch';
import ResumeGeofence from './components/resume-geofence';
import StatsSwitch from './components/stats-switch';
import NotificationsSwitch from './components/notifications-switch';
import ReceiverEndpoint from './components/receiver-endpoint';
import BackgroundGeolocation from "react-native-background-geolocation";
import {Spinner} from 'native-base';

class Settings extends PureComponent {
    constructor () {
    super()
    this.state = {url:'http://',activity:'',deferTime:0,stopOnStationary:"True",geofenceProximityRadius:'1000',useSignificantChangesOnly: false, desiredAccuracy:5,autoSyncThreshold:100,loading:true}
  }
  componentDidMount() {
    BackgroundGeolocation.ready({},(state)=> {
      console.log("Settings---------->",state.autoSyncThreshold)
      this.setState({
        url: state.url,
        useSignificantChangesOnly: state.useSignificantChangesOnly,
        desiredAccuracy:state.desiredAccuracy,
        activity: state.activityType,
        autoSyncThreshold: state.autoSyncThreshold,
        geofenceProximityRadius: state.geofenceProximityRadius,
        stopOnStationary: state.stopOnStationary,
        deferTime: state.deferTime,
        loading:false
      })
    });

  }
  fetchDataFromBG() {

  }


  render() {
    const isLoading = this.state.loading;

    return (
      <>
      {isLoading?<Spinner/>:
        <ScrollView>
        <SettingsContainer>
          <View style={[styles.header]}>
            <Text style={[styles.headerContent]}>SETTINGS</Text>
          </View>

          <ReceiverEndpoint url={this.state.url}/>
          <SignificantLocation useSignificantChangesOnly={this.state.useSignificantChangesOnly}/>
          <ActivityType />
          <DesiredAccuracy desiredAccuracy={this.state.desiredAccuracy} />
          <DeferLocUpdates deferTime={this.state.deferTime} />
          <PtsPerBatch ptsPerBatch={this.state.autoSyncThreshold}/>
          <ResumeGeofence geofenceProximityRadius={this.state.geofenceProximityRadius}/>
          <NotificationsSwitch />
          <Text style={{fontSize: 12,marginLeft: 20,marginRight: 20}}>(Enable audio notifications of app event such as when the tracking acquires a new position)</Text>
          <UpdateSwitch stopOnStationary={this.state.stopOnStationary}/>
          <Text style={{fontSize: 12,marginLeft: 20,marginRight: 20}}>(The plugin automatically stops tracking after 10 minutes of non-activity  - Not recommended to activate it)</Text>
        </SettingsContainer>
        </ScrollView>
      }
      </>
    );

  }
}

const styles = StyleSheet.create({

  header: {
    marginTop: 10
  },
  headerContent: {
    fontSize:16
  }

});

export default Settings;

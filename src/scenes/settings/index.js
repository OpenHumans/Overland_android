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
    this.state = {url:'http://',activity:'',useSignificantChangesOnly: false, desiredAccuracy:5,autoSyncThreshold:100,loading:true}
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
          <DeferLocUpdates />
          <PtsPerBatch ptsPerBatch={this.state.autoSyncThreshold}/>
          <UpdateSwitch />
          <ResumeGeofence />
          <StatsSwitch />
          <Text style={{fontSize: 12,marginLeft: 20,marginRight: 20}}>(In addition to location data, also log data about visits and other app activity)</Text>
          <NotificationsSwitch />
          <Text style={{fontSize: 12,marginLeft: 20,marginRight: 20}}>(Enable local notifications of app event such as when tracking has been Automatically stopped and started)</Text>
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

import React from 'react';
import { Text, StyleSheet, DeviceEventEmitter } from 'react-native';
import { Button } from 'react-native-elements';
import TripModeContainer from './components/trip-mode-container';

import  IconElement  from './components/icon-element';
import {scale} from '../../../../../../utils/scaling';

import {Dimensions, View} from 'react-native'
const DeviceWidth = Dimensions.get('window').width

const TripMode = ({ }) => {
  return (
    <TripModeContainer>
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text style={{color: "black",fontSize: scale(20),paddingBottom:10}}>TRIP MODE</Text>
    <Text style={{color: "black",fontSize: scale(11),paddingBottom:20}}>(click on one of them)</Text>
      <View style={{
        flexDirection: 'row',
        backgroundColor: "#f4f4f4"}}>
        <View>
          <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} >
            <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} ><Button icon={ <IconElement mobilityType={'walking'} /> } onPress={()=>{DeviceEventEmitter.emit('closeEvent','walking')}} type="clear"/></View>
            <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} ><Button icon={ <IconElement mobilityType={'driving'}/> } onPress={()=>{DeviceEventEmitter.emit('closeEvent','driving');}} type="clear"/></View>
            <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} ><Button icon={ <IconElement mobilityType={'ship'}/> } onPress={()=>{DeviceEventEmitter.emit('closeEvent','ship');}} type="clear"/></View>
          </View>
        </View>
        <View>
          <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} ><Button icon={ <IconElement mobilityType={'running'}/> } onPress={()=>{DeviceEventEmitter.emit('closeEvent','running');}} type="clear"/></View>
          <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} ><Button icon={ <IconElement mobilityType={'taxi'}/> } onPress={()=>{DeviceEventEmitter.emit('closeEvent','taxi');}} type="clear"/></View>
          <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} ><Button icon={ <IconElement mobilityType={'train'}/> } onPress={()=>{DeviceEventEmitter.emit('closeEvent','train');}} type="clear"/></View>
        </View>
        <View>

          <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} ><Button icon={ <IconElement mobilityType={'cycling'}/> } onPress={()=>{DeviceEventEmitter.emit('closeEvent','cycling');}} type="clear"/></View>
          <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} ><Button icon={ <IconElement mobilityType={'bus'}/> } onPress={()=>{DeviceEventEmitter.emit('closeEvent','bus');}} type="clear"/></View>
          <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} ><Button icon={ <IconElement mobilityType={'plane'}/> } onPress={()=>{DeviceEventEmitter.emit('closeEvent','plane');}} type="clear"/></View>

        </View>
      </View>
    </View>
    </TripModeContainer>
  );
};

export default TripMode;

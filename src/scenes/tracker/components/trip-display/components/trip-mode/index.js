import React from 'react';
import { Text, StyleSheet, DeviceEventEmitter } from 'react-native';
import { Button } from 'react-native-elements';
import TripModeContainer from './components/trip-mode-container';

import  IconElement2  from '../icon-element';

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
    <Text style={{color: "black",fontSize: 22,paddingBottom:20}}>TRIP MODE</Text>
      <View style={{
        flexDirection: 'row',
        backgroundColor: "#f4f4f4"}}>
        <View>
          <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} >
            <Button icon={ <IconElement2 mobilityType={'walking'} /> } onPress={()=>{DeviceEventEmitter.emit('closeEvent')}} type="clear"/>
            <Button icon={ <IconElement2 mobilityType={'ship'}/> } onPress={()=>{console.log('toto');DeviceEventEmitter.emit('closeEvent','driving');}} type="clear"/>
            <Button icon={ <IconElement2 mobilityType={'bus'}/> } onPress={()=>{console.log('toto');DeviceEventEmitter.emit('closeEvent','bus');}} type="clear"/>
          </View>
        </View>
        <View>
          <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} ><Button icon={ <IconElement2 mobilityType={'running'}/> } onPress={()=>console.log('toto')} type="clear"/></View>
          <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} ><Button icon={ <IconElement2 mobilityType={'driving'}/> } onPress={()=>{console.log('toto');DeviceEventEmitter.emit('closeEvent','driving');}} type="clear"/></View>
          <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} ><Button icon={ <IconElement2 mobilityType={'train'}/> } onPress={()=>{console.log('toto');DeviceEventEmitter.emit('closeEvent','train');}} type="clear"/></View>
        </View>
        <View>

          <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} ><Button icon={ <IconElement2 mobilityType={'cycling'}/> } onPress={()=>console.log('toto')} type="clear"/></View>
          <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} ><Button icon={ <IconElement2 mobilityType={'taxi'}/> } onPress={()=>{console.log('toto');DeviceEventEmitter.emit('closeEvent','taxi');}} type="clear"/></View>
          <View style={{width: DeviceWidth*0.2, height: DeviceWidth*0.2, marginBottom:1}} ><Button icon={ <IconElement2 mobilityType={'plane'}/> } onPress={()=>{console.log('toto');DeviceEventEmitter.emit('closeEvent','plane');}} type="clear"/></View>

        </View>
      </View>
    </View>
    </TripModeContainer>
  );
};

export default TripMode;

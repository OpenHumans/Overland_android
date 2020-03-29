import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import SignificantLocationContainer from './components/significant-location-container'
import { ButtonGroup } from 'react-native-elements';
import BackgroundGeolocation from "react-native-background-geolocation";
import AsyncStorage from '@react-native-community/async-storage';

class SignificantLocation extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: this.props.useSignificantChangesOnly?1:0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    let _useSignificantChangesOnly = false;
    if(selectedIndex==0){
      _useSignificantChangesOnly = false;
    }else{
      _useSignificantChangesOnly = true;
    }
    this.setState({selectedIndex})
    BackgroundGeolocation.ready({
      useSignificantChangesOnly:_useSignificantChangesOnly
    });
    this.storeData({name:"@useSignificantChangesOnly",value:_useSignificantChangesOnly?'True':'False'})
  }
  async storeData (state) {
    try {
      console.log("storeData::");
      await AsyncStorage.setItem(state.name,state.value);
    } catch (error) {
      console.log("storeData::err::",error);
    }
  };

  render() {
    const buttons = ['Disabled', 'Enabled']
    const { selectedIndex } = this.state

    return (
      <SignificantLocationContainer>
      <Text style={{fontSize:16}}>Significant Location</Text>
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{width:"90%"}}
    />
      </SignificantLocationContainer>
    );
  }
}

export default SignificantLocation;

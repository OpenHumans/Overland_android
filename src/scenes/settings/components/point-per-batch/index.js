import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PtsPerBatchContainer from './components/point-per-batch-container';
import { ButtonGroup } from 'react-native-elements';
import BackgroundGeolocation from "react-native-background-geolocation";
import AsyncStorage from '@react-native-community/async-storage';


class PointPerBatch extends React.Component {

  constructor (props) {
    super(props)
    this.buttons = ['50', '100', '200', '500', '1000'];
    const _index = this.convNbToIndex(String(this.props.ptsPerBatch));
    this.state = {
      selectedIndex: _index
    };
    this.updatePtPerBatch = this.updatePtPerBatch.bind(this);
  }
  async componentDidMount(){

  }
  convNbToIndex(nb) {
    console.log("convNbToIndex :: ", nb, this.buttons.indexOf(nb))
    return this.buttons.indexOf(nb);
  }

  updatePtPerBatch (selectedIndex) {
    BackgroundGeolocation.ready({
      autoSyncThreshold: Number(this.buttons[selectedIndex])
    });
    console.log("PTS PER BATCH ===>",this.buttons[selectedIndex])
    this.setState({selectedIndex})
    this.storeData({name:"@autoSyncThreshold",value:this.buttons[selectedIndex]})
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
    const { selectedIndex } = this.state

    return (
      <PtsPerBatchContainer>
      <Text style={{fontSize:16}}>Point per Batch</Text>
      <ButtonGroup
      onPress={this.updatePtPerBatch}
      selectedIndex={selectedIndex}
      buttons={this.buttons}
      containerStyle={{width:"90%"}}
    />
      </PtsPerBatchContainer>
    );
  }
}

export default PointPerBatch;

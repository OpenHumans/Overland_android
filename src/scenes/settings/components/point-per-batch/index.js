import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PtsPerBatchContainer from './components/point-per-batch-container';
import { ButtonGroup } from 'react-native-elements';
import BackgroundGeolocation from "react-native-background-geolocation";
import {storeData} from '../../../../utils/store';

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
    if (__DEV__) {
      console.log("convNbToIndex :: ", nb, this.buttons.indexOf(nb))
    }
    return this.buttons.indexOf(nb);
  }

  updatePtPerBatch (selectedIndex) {
    BackgroundGeolocation.setConfig({
      autoSyncThreshold: Number(this.buttons[selectedIndex])
    });
    if (__DEV__) {
      console.log("PTS PER BATCH ===>",this.buttons[selectedIndex])
    }
    this.setState({selectedIndex})
    storeData({name:"@autoSyncThreshold",value:this.buttons[selectedIndex]})
  }

  render() {
    const { selectedIndex } = this.state

    return (
      <PtsPerBatchContainer>
      <Text style={{fontSize:16}}>Point per Batch</Text>
      <ButtonGroup
      onPress={this.updatePtPerBatch}
      selectedIndex={selectedIndex}
      buttons={this.buttons}
      containerStyle={{width:"90%",height:48}}
    />
      </PtsPerBatchContainer>
    );
  }
}

export default PointPerBatch;

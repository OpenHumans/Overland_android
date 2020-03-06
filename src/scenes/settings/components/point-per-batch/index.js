import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PtsPerBatchContainer from './components/point-per-batch-container';
import { ButtonGroup } from 'react-native-elements';

class PointPerBatch extends React.Component {

  constructor () {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render() {
    const buttons = ['50', '100', '200', '500', '1000']
    const { selectedIndex } = this.state

    return (
      <PtsPerBatchContainer>
      <Text style={{fontSize:16}}>Point per Batch</Text>
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{width:"90%"}}
    />
      </PtsPerBatchContainer>
    );
  }
}

export default PointPerBatch;

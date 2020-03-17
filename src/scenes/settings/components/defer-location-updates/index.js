import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import DeferLocUpdatesContainer from './components/defer-location-updates-container';
import { ButtonGroup } from 'react-native-elements';

class DeferLocUpdates extends React.Component {

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
    const buttons = ['Never', '100m', '1km', '5km', 'Max']
    const { selectedIndex } = this.state

    return (
      <DeferLocUpdatesContainer>
      <Text style={{fontSize:16}}>Desired Accuracy</Text>
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{width:"90%"}}
    />
      </DeferLocUpdatesContainer>
    );
  }
}

export default DeferLocUpdates;

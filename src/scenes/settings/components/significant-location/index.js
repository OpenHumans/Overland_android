import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import SignificantLocationContainer from './components/significant-location-container'
import { ButtonGroup } from 'react-native-elements';

class SignificantLocation extends React.Component {

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
    const buttons = ['Disabled', 'Enabled', 'Significant Only']
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

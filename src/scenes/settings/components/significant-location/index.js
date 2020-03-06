import React from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import SignificantLocationContainer from './components/significant-location-container'


class SignificantLocation extends React.Component {

  constructor () {
    super()
    this.state = {
      selectedIndex: 2
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
      <Text>Significant Location</Text>
      <Button>Disabled</Button>
      <Button>Enabled</Button>
      <Button>Significant Only</Button>
      </SignificantLocationContainer>
    );
  }
}

export default SignificantLocation;

import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ActivityTypeContainer from './components/activity-type-container'
import { ButtonGroup } from 'react-native-elements';

class ActivityType extends React.Component {

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
    const buttons = ['Other', 'Fitness', 'Automotive', 'Navigation']
    const { selectedIndex } = this.state

    return (
      <ActivityTypeContainer>
      <Text style={{fontSize:16}}>Activity Type</Text>
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}

      containerStyle={{width:"90%"}}
    />
      </ActivityTypeContainer>
    );
  }
}

export default ActivityType;

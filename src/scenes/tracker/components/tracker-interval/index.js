import React from 'react';
import { Text, StyleSheet } from 'react-native';
import TrackerIntervalContainer from './components/tracker-interval-container';
import Slider from '@react-native-community/slider';

class TrackerInterval extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: 0,
    };
    this.onIntervalChange = this.onIntervalChange.bind(this);
  }

  onIntervalChange(value) {
    const num = parseInt(value, 10);
    console.log('====>', num);
    this.setState({
      interval: num,
    });
  }

  render() {
    const { interval } = this.state;
    return (
      <TrackerIntervalContainer>
        <Text>
          {interval > 60
            ? `${parseInt(interval / 60, 10)} minutes`
            : `${interval} secondes`}
        </Text>
        <Slider
          onSlidingComplete={this.onIntervalChange}
          step={1}
          style={styles.slider}
          minimumValue={0}
          value={interval}
          maximumValue={1800}
        />
      </TrackerIntervalContainer>
    );
  }
}

const styles = StyleSheet.create({
  slider: {
    width: 300,
    height: 40,
  },
});

export default TrackerInterval;

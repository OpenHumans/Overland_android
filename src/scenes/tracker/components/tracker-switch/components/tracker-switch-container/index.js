import React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../../../../../../components/container';

const TrackerSwitchContainer = props => {
  return <Container style={styles.container}>{props.children}</Container>;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%"
  },
});

export default TrackerSwitchContainer;

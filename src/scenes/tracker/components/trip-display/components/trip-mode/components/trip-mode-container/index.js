import React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../../../../../../../../components/container';

const TripModeContainer = props => {
  return <Container style={styles.container}>{props.children}</Container>;
};

const styles = StyleSheet.create({
  container: {

  },
});

export default TripModeContainer;

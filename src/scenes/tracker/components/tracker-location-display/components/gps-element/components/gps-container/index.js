import React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../../../../../../../../components/container';

const GPSContainer = props => {
  return <Container style={styles.container}>{props.children}</Container>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    flex: 1,
    flexDirection: 'column',
    alignItems:'center'
  },
});

export default GPSContainer;

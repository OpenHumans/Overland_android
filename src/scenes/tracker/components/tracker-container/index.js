import React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../../../../components/container';

const TrackerContainer = props => {
  return <Container style={styles.container}>{props.children}</Container>;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default TrackerContainer;

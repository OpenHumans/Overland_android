import React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../../../../../../components/container';

const TrackerLocationDisplayContainer = props => {
  return <Container style={styles.container}>{props.children}</Container>;
};

const styles = StyleSheet.create({
  container: {
    // TODO HANDLE MARGIN BETWEEN
    marginRight: 20,
    marginLeft: 20,
    //display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default TrackerLocationDisplayContainer;

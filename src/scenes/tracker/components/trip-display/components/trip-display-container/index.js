import React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../../../../../../components/container';

const TrackerLocationDisplayContainer = props => {
  return <Container style={props.trip?styles.containerTrip:styles.containerNoTrip}>{props.children}</Container>;
};

const styles = StyleSheet.create({
  containerNoTrip: {
    // TODO HANDLE MARGIN BETWEEN
    paddingTop: 0,
    //display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#e3e3e3'//'#c3eac1'
  },
  containerTrip: {
    // TODO HANDLE MARGIN BETWEEN
    paddingTop: 0,
    //display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#c3eac1'
  },
});

export default TrackerLocationDisplayContainer;

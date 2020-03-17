import React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../../../../../../components/container';

const NotifSwitchContainer = props => {
  return <Container style={styles.container}>{props.children}</Container>;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginLeft: 10,
    paddingRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%"
  },
});

export default NotifSwitchContainer;

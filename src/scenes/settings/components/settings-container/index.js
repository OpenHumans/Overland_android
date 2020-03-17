import React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../../../../components/container';

const SettingsContainer = props => {
  return <Container style={styles.container}>{props.children}</Container>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
});

export default SettingsContainer;

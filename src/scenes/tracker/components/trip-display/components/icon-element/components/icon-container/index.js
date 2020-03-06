import React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../../../../../../../../components/container';

const IconContainer = props => {
  return <Container style={styles.container}>{props.children}</Container>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'flex-end'

  },
});

export default IconContainer;

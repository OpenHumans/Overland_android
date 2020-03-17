import React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../../../../../../components/container';

const SignificantLocationContainer = props => {
  return <Container style={styles.container}>{props.children}</Container>;
};

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    marginLeft:20,
    marginRight:10,
    width:"100%"
  },
});

export default SignificantLocationContainer;

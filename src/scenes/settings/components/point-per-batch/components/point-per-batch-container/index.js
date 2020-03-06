import React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../../../../../../components/container';

const PtsPerBatchContainer = props => {
  return <Container style={styles.container}>{props.children}</Container>;
};

const styles = StyleSheet.create({
  container: {
    marginTop:10
  },
});

export default PtsPerBatchContainer;

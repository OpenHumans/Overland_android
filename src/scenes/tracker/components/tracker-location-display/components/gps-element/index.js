import React from 'react';
import { Text, StyleSheet } from 'react-native';
import GPSContainer from './components/gps-container';

const GPSElement = ({ title, valueX, valueY, description }) => {
  return (
    <GPSContainer>
      <Text style={{fontSize:16}}>{title}</Text>
      <Text style={{fontSize:12}}>{valueX}</Text>
      <Text style={{fontSize:12}}>{valueY}</Text>
      <Text style={{fontSize:10}}>{description}</Text>
    </GPSContainer>
  );
};

export default GPSElement;

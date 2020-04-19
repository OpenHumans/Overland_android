import React from 'react';
import { Text, StyleSheet } from 'react-native';
import GPSContainer from './components/gps-container';
import {scale} from '../../../../../../utils/scaling'

const GPSElement = ({ title, valueX, valueY, description }) => {
  return (
    <GPSContainer>
      <Text style={{fontSize:scale(14)}}>{title}</Text>
      <Text style={{fontSize:scale(11)}}>{valueX}</Text>
      <Text style={{fontSize:scale(11)}}>{valueY}</Text>
      <Text style={{fontSize:scale(9)}}>{description}</Text>
    </GPSContainer>
  );
};

export default GPSElement;

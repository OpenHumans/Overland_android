import React from 'react';
import { Text, StyleSheet,PixelRatio } from 'react-native';
import LocationContainer from './components/location-container';
import {scale} from '../../../../../../utils/scaling'

const LocationElement = ({ title, value, description }) => {
  return (
    <LocationContainer>
      <Text style={{fontSize:scale(14)}}>{title}</Text>
      <Text style={{fontSize:scale(24)}}>{value}</Text>
      <Text style={{fontSize:scale(9)}}>{description}</Text>
    </LocationContainer>
  );
};

export default LocationElement;

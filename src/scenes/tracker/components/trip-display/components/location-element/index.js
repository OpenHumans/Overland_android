import React from 'react';
import { Text, StyleSheet } from 'react-native';
import LocationContainer from './components/location-container';

const LocationElement = ({ title, value, description }) => {
  return (
    <LocationContainer>
      <Text style={{fontSize:16}}>{title}</Text>
      <Text style={{fontSize:28}}>{value}</Text>
      <Text style={{fontSize:10}}>{description}</Text>
    </LocationContainer>
  );
};

export default LocationElement;

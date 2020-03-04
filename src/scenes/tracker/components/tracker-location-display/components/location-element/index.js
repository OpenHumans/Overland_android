import React from 'react';
import { Text, StyleSheet } from 'react-native';
import LocationContainer from './components/location-container';

const LocationElement = ({ title, value, description }) => {
  return (
    <LocationContainer>
      <Text>{title}</Text>
      <Text>{value}</Text>
      <Text>{description}</Text>
    </LocationContainer>
  );
};

export default LocationElement;

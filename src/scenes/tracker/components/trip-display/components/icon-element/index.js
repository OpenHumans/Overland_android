import React from 'react';
import { Text, StyleSheet } from 'react-native';
import IconContainer from './components/icon-container';
import Icon from 'react-native-vector-icons/Ionicons';

const IconElement = ({mobilityType }) => {
  let iconName = 'md-bicycle'

  switch(mobilityType) {
    case 'cycling':
      iconName = 'md-bicycle'
      break;
    case 'walking':
      iconName = 'md-walk'
      break;
    case 'running':
        iconName = 'md-pulse'
        break;
    case 'driving':
        iconName = 'md-car'
        break;
    case 'stationary':
        iconName = 'md-man'
        break;
    default:
      iconName = ''
  }
  return (
    <IconContainer>
      <Icon  size={50} name={iconName} />
      <Text style={{fontSize:10}}>{mobilityType}</Text>
    </IconContainer>
  );
};

export default IconElement;

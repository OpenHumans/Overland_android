import React from 'react';
import { Text, StyleSheet } from 'react-native';
import IconContainer from './components/icon-container';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AFicons from 'react-native-vector-icons/FontAwesome';
import AFicons5 from 'react-native-vector-icons/FontAwesome5';
import {scale} from '../../../../../../../../utils/scaling';

const IconElement = ({mobilityType }) => {
  let iconName = 'bicycle'
  let awesomIcon = false;

  switch(mobilityType) {
    case 'cycling':
      awesomIcon = false;
      iconName = 'bicycle';
      break;
    case 'walking':
      awesomIcon = false;
      iconName = 'walking'
      break;
    case 'running':
      awesomIcon = false;
      iconName = 'running'
      break;
    case 'ship':
      awesomIcon = true;
      iconName = 'ship';
      break;
    case 'driving':
      awesomIcon = false;
      iconName = 'car'
      break;
    case 'taxi':
      awesomIcon = true;
      iconName = 'taxi'
      break;
    case 'bus':
      awesomIcon = true;
      iconName = 'bus'
      break;
    case 'train':
      awesomIcon = true;
      iconName = 'train'
      break;
    case 'plane':
      awesomIcon = true;
      iconName = 'plane'
      break;
    default:
      iconName = ''
  }
  return (
    <IconContainer>
      {awesomIcon?<AFicons  size={scale(36)} name={iconName} />:<AFicons5  size={scale(36)} name={iconName} />}
      <Text style={{fontSize:scale(9)}}>{mobilityType}</Text>
    </IconContainer>
  );
};

export default IconElement;

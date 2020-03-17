import React from 'react';
import {StyleSheet} from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

library.add(fas);

const TabIcon = ({ ...others }) => {
  return <FontAwesomeIcon size={ 32 } {...others} />;
};

export default TabIcon;

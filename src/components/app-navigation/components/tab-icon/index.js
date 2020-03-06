import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

library.add(fas);

const style = StyleSheet.create({
  icon: {
    color: '#356345'
  }
})

const TabIcon = ({ ...others }) => {
  return <FontAwesomeIcon size={32} style={ style.icon } {...others} />;
};

export default TabIcon;

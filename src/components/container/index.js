import React from 'react';
import { View } from 'react-native';

const Container = props => {
  return <View style={props.style}>{props.children}</View>;
};

export default Container;

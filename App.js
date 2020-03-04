import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/components/app-navigation';

const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </>
  );
};

export default App;

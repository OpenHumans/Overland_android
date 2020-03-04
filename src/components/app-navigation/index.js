import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabIcon from './components/tab-icon';
import Tracker from '../../scenes/tracker';
import Settings from '../../scenes/settings';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Tracker" backBehavior="initialRoute">
      <Tab.Screen
        name="Tracker"
        component={Tracker}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="map-marker-alt" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="cogs" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;

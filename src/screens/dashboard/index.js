/**
 * Home Screen with Bottom Tab Navigator
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import _map from 'lodash/map';
import { tabRoutes } from '../../navigation/homeTabRoutes';

// Create Tab Navigator
const Tab = createBottomTabNavigator();

function Dashboard() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      }}>
      {_map(tabRoutes, (route) => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </Tab.Navigator>
  );
}

export default Dashboard;

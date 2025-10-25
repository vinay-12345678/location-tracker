/**
 * Tab Routes Configuration
 * Define all bottom tab routes and their components here
 */

import TrackScreen from '../screens/track';
import ProfileScreen from '../screens/profile';
import SettingsScreen from '../screens/settings';

// Bottom Tab Navigator Routes
export const tabRoutes = [
  {
    name: 'Track',
    component: TrackScreen,
    options: {
      title: 'Track',
      // tabBarIcon: ({ color, size }) => (
      //   <Icon name="map" size={size} color={color} />
      // ),
    },
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    options: {
      title: 'Profile',
      // tabBarIcon: ({ color, size }) => (
      //   <Icon name="user" size={size} color={color} />
      // ),
    },
  },
  {
    name: 'Settings',
    component: SettingsScreen,
    options: {
      title: 'Settings',
      // tabBarIcon: ({ color, size }) => (
      //   <Icon name="settings" size={size} color={color} />
      // ),
    },
  },
];


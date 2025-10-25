/**
 * Tab Routes Configuration
 * Define all bottom tab routes and their components here
 */

import Home from '../screens/home';
import Track from '../screens/track';
import Settings from '../screens/settings';

// Bottom Tab Navigator Routes
export const tabRoutes = [
  {
    name: 'Home',
    component: Home,
    options: {
      title: 'Home',
      // tabBarIcon: ({ color, size }) => (
      //   <Icon name="map" size={size} color={color} />
      // ),
    },
  },
  {
    name: 'Track',
    component: Track,
    options: {
      title: 'Track',
      // tabBarIcon: ({ color, size }) => (
      //   <Icon name="user" size={size} color={color} />
      // ),
    },
  },
  {
    name: 'Settings',
    component: Settings,
    options: {
      title: 'Settings',
      // tabBarIcon: ({ color, size }) => (
      //   <Icon name="settings" size={size} color={color} />
      // ),
    },
  },
];


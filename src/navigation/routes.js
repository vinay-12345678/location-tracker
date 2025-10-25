/**
 * Routes Configuration
 * Define all screen routes and their components here
 */

import HomeScreen from '../screens/home';

// Stack Navigator Routes
export const stackRoutes = [
  {
    name: 'Home',
    component: HomeScreen,
    options: {
      headerShown: false,
    },
  },
  // Add more stack routes here as needed
  // {
  //   name: 'Details',
  //   component: DetailsScreen,
  //   options: { title: 'Details' },
  // },
];


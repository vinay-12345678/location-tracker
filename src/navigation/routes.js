/**
 * Routes Configuration
 * Define all screen routes and their components here
 */

import Dashboard from '../screens/dashboard';

// Stack Navigator Routes
export const stackRoutes = [
  {
    name: 'Dashboard',
    component: Dashboard,
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


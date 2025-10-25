/**
 * Navigation Service
 * Allows navigation from outside React components
 */

import { createNavigationContainerRef } from '@react-navigation/native';

// Create navigation ref
export const navigationRef = createNavigationContainerRef();

/**
 * Navigate to a specific route
 * @param {string} name - Route name
 * @param {object} params - Route parameters
 */
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

/**
 * Replace the current route with a new one
 * @param {string} name - Route name
 * @param {object} params - Route parameters
 */
export function replace(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch({
      type: 'REPLACE',
      payload: { name, params },
    });
  }
}

/**
 * Push a new route onto the stack
 * @param {string} name - Route name
 * @param {object} params - Route parameters
 */
export function push(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch({
      type: 'PUSH',
      payload: { name, params },
    });
  }
}

/**
 * Pop the top route from the stack (go back)
 * @param {number} count - Number of routes to pop (default: 1)
 */
export function pop(count = 1) {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.dispatch({
      type: 'POP',
      payload: { count },
    });
  }
}

/**
 * Go back to the previous route
 */
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

/**
 * Reset the navigation state
 * @param {object} state - New navigation state
 */
export function reset(state) {
  if (navigationRef.isReady()) {
    navigationRef.reset(state);
  }
}

/**
 * Get current route name
 * @returns {string} Current route name
 */
export function getCurrentRouteName() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  }
  return null;
}

/**
 * Get current route params
 * @returns {object} Current route params
 */
export function getCurrentRouteParams() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.params;
  }
  return null;
}

/**
 * Check if navigation is ready
 * @returns {boolean}
 */
export function isReady() {
  return navigationRef.isReady();
}

/**
 * Check if can go back
 * @returns {boolean}
 */
export function canGoBack() {
  return navigationRef.isReady() && navigationRef.canGoBack();
}


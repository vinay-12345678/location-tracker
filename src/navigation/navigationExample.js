/**
 * Navigation Service Usage Examples
 * This file shows how to use navigation functions outside of React components
 */

import { navigate, replace, push, pop, goBack, reset } from './navigationService';

// ========================================
// Example 1: API Service with Navigation
// ========================================

export const userAPI = {
  async login(credentials) {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      const user = await response.json();
      
      // Navigate to home after successful login
      replace('Home', { user });
      
      return user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  async logout() {
    try {
      await fetch('/api/logout', { method: 'POST' });
      
      // Reset navigation to login screen
      reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
};

// ========================================
// Example 2: Notification Handler
// ========================================

export function handlePushNotification(notification) {
  const { type, data } = notification;

  switch (type) {
    case 'chat_message':
      navigate('Chat', { 
        chatId: data.chatId,
        userId: data.senderId,
      });
      break;

    case 'friend_request':
      navigate('Profile', { userId: data.userId });
      break;

    case 'order_update':
      navigate('OrderDetails', { orderId: data.orderId });
      break;

    default:
      navigate('Home');
  }
}

// ========================================
// Example 3: Deep Link Handler
// ========================================

export function handleDeepLink(url) {
  // Example URLs:
  // myapp://profile/123
  // myapp://settings
  // myapp://post/456

  const cleanUrl = url.replace('myapp://', '');
  const [screen, id] = cleanUrl.split('/');

  switch (screen) {
    case 'profile':
      navigate('Profile', { userId: parseInt(id, 10) });
      break;

    case 'settings':
      navigate('Settings');
      break;

    case 'post':
      navigate('PostDetails', { postId: parseInt(id, 10) });
      break;

    default:
      navigate('Home');
  }
}

// ========================================
// Example 4: Error Handler with Navigation
// ========================================

export function handleAPIError(error) {
  switch (error.status) {
    case 401:
      // Unauthorized - redirect to login
      replace('Login', { 
        message: 'Session expired. Please login again.',
      });
      break;

    case 403:
      // Forbidden - go back
      goBack();
      alert('You do not have permission to access this resource.');
      break;

    case 404:
      // Not found - navigate to error screen
      navigate('NotFound');
      break;

    case 500:
      // Server error
      navigate('Error', { 
        message: 'Something went wrong. Please try again later.',
      });
      break;

    default:
      console.error('Unhandled error:', error);
  }
}

// ========================================
// Example 5: Form Submission Handler
// ========================================

export const formHandlers = {
  async submitPost(postData) {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
      });
      const post = await response.json();

      // Navigate to the newly created post
      replace('PostDetails', { postId: post.id });
      
      return post;
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    }
  },

  cancelForm() {
    // Go back to previous screen
    goBack();
  },

  skipToEnd() {
    // Pop multiple screens (e.g., skip wizard steps)
    pop(3);
  },
};

// ========================================
// Example 6: Analytics with Navigation
// ========================================

export const analytics = {
  logScreenView(screenName, params) {
    console.log(`[Analytics] Screen View: ${screenName}`, params);
    // Send to analytics service
  },

  navigateAndLog(screenName, params) {
    // Navigate and log the screen view
    navigate(screenName, params);
    this.logScreenView(screenName, params);
  },
};

// ========================================
// Example 7: Navigation Helper Functions
// ========================================

export const navigationHelpers = {
  // Go to home screen
  goHome() {
    navigate('Home');
  },

  // Go to profile (current user or specific user)
  goToProfile(userId) {
    if (userId) {
      navigate('Profile', { userId });
    } else {
      navigate('Profile'); // Current user
    }
  },

  // Go to settings
  goToSettings() {
    navigate('Settings');
  },

  // Open details in a new screen (allows multiple instances)
  openDetails(itemId) {
    push('Details', { itemId });
  },

  // Complete flow and return to start
  completeFlow() {
    // Reset to home screen
    reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  },

  // Navigate back multiple screens
  goBackMultiple(count) {
    pop(count);
  },
};

// ========================================
// Example 8: Async Navigation (after delay)
// ========================================

export function navigateAfterDelay(screenName, params, delayMs = 1000) {
  setTimeout(() => {
    navigate(screenName, params);
  }, delayMs);
}

// ========================================
// Example 9: Conditional Navigation
// ========================================

export function navigateBasedOnAuth(isAuthenticated, destination) {
  if (isAuthenticated) {
    navigate(destination);
  } else {
    replace('Login', { 
      returnTo: destination,
      message: 'Please login to continue',
    });
  }
}

// ========================================
// Example 10: Batch Navigation Operations
// ========================================

export const batchNavigation = {
  // Navigate through multiple screens
  async navigateSequence(screens) {
    for (const screen of screens) {
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate(screen.name, screen.params);
    }
  },

  // Reset and navigate
  resetAndNavigate(screenName, params) {
    reset({
      index: 0,
      routes: [{ name: screenName, params }],
    });
  },
};

// ========================================
// How to Use These Examples
// ========================================

/*
// In your Redux actions:
import { userAPI } from './navigation/navigationExample';
dispatch(userAPI.login(credentials));

// In your notification service:
import { handlePushNotification } from './navigation/navigationExample';
handlePushNotification(notificationData);

// In your deep link handler:
import { handleDeepLink } from './navigation/navigationExample';
Linking.addEventListener('url', (event) => {
  handleDeepLink(event.url);
});

// In your error boundary:
import { handleAPIError } from './navigation/navigationExample';
axios.interceptors.response.use(
  response => response,
  error => {
    handleAPIError(error.response);
    return Promise.reject(error);
  }
);

// In your components or services:
import { navigationHelpers } from './navigation/navigationExample';
navigationHelpers.goHome();
navigationHelpers.goToProfile(123);
*/


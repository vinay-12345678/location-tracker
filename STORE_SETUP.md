# Store Setup Documentation

## Overview

This document outlines the Zustand store and MMKV storage setup for the Location Tracker app.

## What Was Installed

### NPM Packages
- **zustand** (latest): Lightweight state management library
- **react-native-mmkv@3.3.3**: Fast, persistent key-value storage (using v3 for RN 0.82 compatibility)

### iOS Dependencies
- Pods installed successfully including MMKVCore for native storage

## File Structure

```
src/
├── storage/
│   └── mmkv.js                 # MMKV storage configuration and adapter
├── store/
│   ├── appStore.js             # Main app-level state store
│   └── README.md               # Store usage documentation
└── screens/
    └── track/
        └── index.js            # Example implementation using the store
```

## Components Created

### 1. MMKV Storage (`src/storage/mmkv.js`)

Configures MMKV storage instance with:
- **Storage ID**: `location-tracker-storage`
- **Encryption**: Enabled for secure data storage
- **Zustand adapter**: Provides interface between MMKV and Zustand persist middleware

### 2. App Store (`src/store/appStore.js`)

A persistent Zustand store that manages:
- **State**:
  - `isTracking` (boolean): Location tracking status
  
- **Actions**:
  - `startTracking()`: Enable location tracking
  - `stopTracking()`: Disable location tracking
  - `toggleTracking()`: Toggle tracking state
  - `reset()`: Reset store to initial state

**Features**:
- ✅ Automatic persistence using MMKV
- ✅ State survives app restarts
- ✅ Fast read/write operations
- ✅ Encrypted storage
- ✅ Type-safe actions

### 3. Track Screen (`src/screens/track/index.js`)

Updated to demonstrate store usage with:
- Real-time tracking status display
- Interactive toggle button
- Individual start/stop action buttons
- Visual status indicator
- Dark mode support
- Modern, polished UI

## Usage Examples

### Basic Usage

```javascript
import useAppStore from '../store/appStore';

function MyComponent() {
  const { isTracking, toggleTracking } = useAppStore();
  
  return (
    <Button 
      title={isTracking ? 'Stop' : 'Start'} 
      onPress={toggleTracking} 
    />
  );
}
```

### Optimized Subscription

```javascript
// Only subscribe to isTracking changes
const isTracking = useAppStore(state => state.isTracking);

// Get action without subscribing to state changes
const startTracking = useAppStore(state => state.startTracking);
```

### Outside React Components

```javascript
// Get current state
const state = useAppStore.getState();
console.log(state.isTracking);

// Call actions
useAppStore.getState().startTracking();
```

## Key Benefits

1. **Performance**: MMKV is significantly faster than AsyncStorage
2. **Persistence**: Data survives app restarts automatically
3. **Type Safety**: Actions are defined and predictable
4. **Developer Experience**: Simple, intuitive API
5. **Security**: Built-in encryption for sensitive data
6. **Cross-platform**: Works on both iOS and Android

## Compatibility Notes

- **React Native Version**: 0.82.1
- **MMKV Version**: 3.3.3 (compatible with RN 0.82)
- **Note**: MMKV v4.x requires newer React Native versions due to Nitro Modules dependency

## Next Steps

To add more state to the app store:

1. Add state to the store definition
2. Create actions to modify the state
3. Update the `partialize` function to persist new state
4. Use the state in your components

Example:
```javascript
// In appStore.js
const useAppStore = create(
  persist(
    (set) => ({
      isTracking: false,
      lastLocation: null, // New state
      
      updateLastLocation: (location) => { // New action
        set({ lastLocation: location });
      },
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        isTracking: state.isTracking,
        lastLocation: state.lastLocation, // Persist new state
      }),
    }
  )
);
```

## Testing the Store

Run the app and navigate to the Track screen to test:
1. Toggle tracking on/off
2. Close the app
3. Reopen the app
4. Navigate back to Track screen
5. Verify the tracking state persisted

## References

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Native MMKV Documentation](https://github.com/mrousavy/react-native-mmkv)
- Store Usage Guide: `src/store/README.md`


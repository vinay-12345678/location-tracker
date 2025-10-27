# Quick Start Guide - Zustand Store & MMKV

## ✅ Setup Complete!

Your app now has a fully configured Zustand store with MMKV persistence!

## 📦 What's Installed

- ✅ Zustand (State Management)
- ✅ React Native MMKV v3.3.3 (Persistent Storage)
- ✅ iOS Pods installed
- ✅ Example implementation in Track screen

## 🚀 Testing the Setup

### Method 1: Use the Track Screen

1. **Start the app**:
   ```bash
   # iOS
   npm run ios
   # or
   npx react-native run-ios
   
   # Android
   npm run android
   # or
   npx react-native run-android
   ```

2. **Navigate to Track tab** (bottom navigation)

3. **Test the tracking toggle**:
   - Tap "Start Tracking" button
   - Status should change to "TRACKING ACTIVE" (green)
   - Tap "Stop Tracking" button
   - Status should change to "TRACKING INACTIVE" (gray)

4. **Test persistence**:
   - Set tracking to "ACTIVE"
   - Close the app completely
   - Reopen the app
   - Navigate back to Track tab
   - Verify status is still "ACTIVE" ✨

### Method 2: Use in Any Component

Create a simple test component:

```javascript
import React from 'react';
import { View, Text, Button } from 'react-native';
import useAppStore from './src/store/appStore';

function TestStore() {
  const { isTracking, toggleTracking } = useAppStore();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Is Tracking: {isTracking ? 'YES' : 'NO'}</Text>
      <Button title="Toggle" onPress={toggleTracking} />
    </View>
  );
}
```

## 🔍 Verify Installation

### Check Package Installation
```bash
cat package.json | grep -E "(zustand|react-native-mmkv)"
```

Should show:
```json
"react-native-mmkv": "3.3.3",
"zustand": "^5.x.x",
```

### Check Files Created
```bash
ls -la src/storage/mmkv.js
ls -la src/store/appStore.js
```

### Check iOS Pods
```bash
grep -r "react-native-mmkv" ios/Podfile.lock
```

## 📚 Documentation Files

- **`STORE_SETUP.md`**: Complete setup documentation
- **`src/store/README.md`**: Detailed usage guide with examples
- **This file**: Quick start guide

## 🎯 Next Steps

### Add More State to Store

1. Open `src/store/appStore.js`
2. Add new state and actions:

```javascript
const useAppStore = create(
  persist(
    (set) => ({
      // Existing
      isTracking: false,
      
      // Add new state
      trackingStartTime: null,
      locationHistory: [],
      
      // Add new actions
      setTrackingStartTime: (time) => set({ trackingStartTime: time }),
      addLocationPoint: (point) => set((state) => ({
        locationHistory: [...state.locationHistory, point]
      })),
      clearLocationHistory: () => set({ locationHistory: [] }),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        isTracking: state.isTracking,
        trackingStartTime: state.trackingStartTime,
        locationHistory: state.locationHistory,
      }),
    }
  )
);
```

### Use in Multiple Screens

The store is globally accessible:

```javascript
// In any screen
import useAppStore from '../../store/appStore';

function AnyScreen() {
  const isTracking = useAppStore(state => state.isTracking);
  return <Text>Tracking: {isTracking ? 'ON' : 'OFF'}</Text>;
}
```

### Create Additional Stores

For different concerns (e.g., user settings, location data):

```javascript
// src/store/userStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../storage/mmkv';

const useUserStore = create(
  persist(
    (set) => ({
      username: '',
      preferences: {},
      setUsername: (name) => set({ username: name }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export default useUserStore;
```

## 🐛 Troubleshooting

### iOS Build Issues

If you encounter pod install issues:
```bash
cd ios
rm -rf Pods Podfile.lock
LANG=en_US.UTF-8 bundle exec pod install
cd ..
```

### Android Build Issues

Clean and rebuild:
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### Store Not Persisting

1. Check that MMKV is properly initialized
2. Verify the store name is unique
3. Check device storage permissions
4. Clear app data and reinstall

### Import Errors

Make sure the import paths are correct:
```javascript
// Use relative paths based on your file location
import useAppStore from '../store/appStore';  // From screens
import useAppStore from '../../store/appStore';  // From nested screens
```

## 📱 Platform-Specific Notes

### iOS
- ✅ Pods installed successfully
- ✅ Works with React Native 0.82.1
- ℹ️ Rosetta2 warning is safe to ignore

### Android
- ✅ Auto-linking handles native modules
- ✅ No additional configuration needed
- ✅ Works out of the box

## 💡 Tips

1. **Use selectors for performance**:
   ```javascript
   const isTracking = useAppStore(state => state.isTracking);
   ```

2. **Access outside components**:
   ```javascript
   useAppStore.getState().isTracking
   ```

3. **Debug state**:
   ```javascript
   console.log('Store state:', useAppStore.getState());
   ```

4. **Clear storage** (for development):
   ```javascript
   import { storage } from './src/storage/mmkv';
   storage.clearAll();
   ```

## ✨ You're All Set!

Your Zustand store with MMKV is ready to use. Check out the Track screen to see it in action!

For more details, see `STORE_SETUP.md` and `src/store/README.md`.


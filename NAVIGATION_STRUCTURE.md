# Navigation Structure

## Current Architecture

### App.tsx (Root Level)
- **NavigationContainer** - Root navigation container
- **Stack Navigator** - For screen-level navigation

```
App.tsx
└── NavigationContainer
    └── Stack Navigator
        └── Home Screen (contains tabs)
```

### Home Screen (Tab Level)
- **Bottom Tab Navigator** - 3 tabs for main app sections

```
Home Screen (src/screens/home/index.js)
└── Bottom Tab Navigator
    ├── Track Tab → Track Screen
    ├── Profile Tab → Profile Screen
    └── Settings Tab → Settings Screen
```

---

## Complete Navigation Tree

```
LocationTracker App
│
├── App.tsx (Stack Navigator + NavigationContainer)
│   │
│   └── Home Screen (Bottom Tab Navigator)
│       ├── 📍 Track Tab
│       │   └── Track Screen (src/screens/track/index.js)
│       │
│       ├── 👤 Profile Tab
│       │   └── Profile Screen (src/screens/profile/index.js)
│       │
│       └── ⚙️ Settings Tab
│           └── Settings Screen (src/screens/settings/index.js)
```

---

## File Structure

```
/src
  /screens
    /home
      index.js      ← Contains Bottom Tab Navigator
    /track
      index.js      ← Track Screen
    /profile
      index.js      ← Profile Screen
    /settings
      index.js      ← Settings Screen
```

---

## How It Works

### 1. App.tsx
- **Responsibility**: Root navigation setup
- **Contains**: NavigationContainer + Stack Navigator
- **Imports**: Only imports HomeScreen
- **Clean and minimal**: Easy to add more stack screens later

### 2. Home Screen (Tab Container)
- **Responsibility**: Main app navigation via tabs
- **Contains**: Bottom Tab Navigator with 3 tabs
- **Tabs**: Track, Profile, Settings
- **Each tab**: Shows a different screen component

---

## Adding More Screens

### To add a new screen to Stack Navigator (App.tsx):
```tsx
<Stack.Screen name="NewScreen" component={NewScreen} />
```

### To add a new tab (Home Screen):
```jsx
<Tab.Screen
  name="NewTab"
  component={NewTabScreen}
  options={{ title: 'New Tab' }}
/>
```

---

## Benefits of This Structure

✅ **Separation of Concerns**: App.tsx handles stack, Home handles tabs
✅ **Scalable**: Easy to add more screens or tabs
✅ **Organized**: Each screen in its own folder
✅ **Clean**: App.tsx is minimal and focused
✅ **Flexible**: Can add nested navigators in any tab

---

## Navigation Examples

### Navigate from App.tsx level:
```tsx
// This would work if you add more stack screens
navigation.navigate('AnotherScreen');
```

### Navigate between tabs (from any tab screen):
```tsx
// Switch to Profile tab
navigation.navigate('Profile');

// Switch to Settings tab
navigation.navigate('Settings');
```

### Access navigation in tab screens:
```tsx
function TrackScreen({ navigation }) {
  // Can use navigation here if needed
  navigation.navigate('Profile');
}
```

---

## Status: ✅ Complete

All navigation is set up and working!

- App.tsx: Stack Navigator + NavigationContainer ✅
- Home Screen: Bottom Tab Navigator with 3 tabs ✅
- Track Screen: Created ✅
- Profile Screen: Created ✅
- Settings Screen: Already existed ✅

Run the app to see the 3 tabs at the bottom! 🚀


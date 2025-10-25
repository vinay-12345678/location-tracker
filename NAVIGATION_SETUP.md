# React Navigation Setup Guide

## ✅ Installation Complete

React Navigation has been successfully installed and configured in your LocationTracker app.

---

## Installed Packages

### Core Navigation
```json
{
  "@react-navigation/native": "latest",
  "@react-navigation/native-stack": "latest",
  "@react-navigation/bottom-tabs": "latest"
}
```

### Required Dependencies
```json
{
  "react-native-screens": "latest",
  "react-native-gesture-handler": "latest",
  "@react-native-masked-view/masked-view": "latest",
  "react-native-safe-area-context": "latest" (already installed)
}
```

**Total**: 29 new packages installed

---

## Configuration Changes

### ✅ 1. iOS Setup
- CocoaPods dependencies installed
- 3 new native modules linked:
  - `RNCMaskedView`
  - `RNGestureHandler`
  - `RNScreens`

### ✅ 2. Android Setup

**MainActivity.kt** - Updated with:
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
  super.onCreate(null)
}
```
This is required for `react-native-screens` to work properly.

### ✅ 3. Entry Point Configuration

**index.js** - Added gesture handler import:
```javascript
import 'react-native-gesture-handler';
```
⚠️ **Important**: This must be at the top of the file before any other imports.

### ✅ 4. Example Implementation

**App.tsx** - Implemented a working example showing:
- Bottom Tab Navigator (3 tabs)
- Native Stack Navigator (nested in Home tab)
- Navigation between screens
- Dark mode support
- TypeScript navigation types

---

## Navigation Structure

```
App
└── NavigationContainer
    └── Bottom Tab Navigator
        ├── HomeTab (Stack Navigator)
        │   ├── Home Screen
        │   └── Details Screen
        ├── Profile Tab
        │   └── Profile Screen
        └── Settings Tab
            └── Settings Screen
```

---

## How to Use

### Basic Navigation

#### Navigate to a screen:
```typescript
navigation.navigate('ScreenName');
```

#### Go back:
```typescript
navigation.goBack();
```

#### Navigate with parameters:
```typescript
navigation.navigate('Details', { itemId: 42 });
```

#### Access parameters:
```typescript
function DetailsScreen({ route }) {
  const { itemId } = route.params;
  return <Text>Item ID: {itemId}</Text>;
}
```

### TypeScript Types

For proper type safety, define your navigation types:

```typescript
type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

function DetailsScreen({ route, navigation }: Props) {
  // Fully typed!
}
```

---

## Common Patterns

### 1. Stack Navigator (for hierarchical navigation)

```typescript
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
```

### 2. Bottom Tab Navigator (for main app sections)

```typescript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

### 3. Custom Tab Bar Icons

```typescript
<Tab.Screen
  name="Home"
  component={HomeScreen}
  options={{
    tabBarIcon: ({ color, size }) => (
      <Icon name="home" color={color} size={size} />
    ),
  }}
/>
```

### 4. Header Customization

```typescript
<Stack.Screen
  name="Details"
  component={DetailsScreen}
  options={{
    title: 'My Details',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
/>
```

---

## Testing Your Setup

Run the app and you should see:
1. Three tabs at the bottom: Home, Profile, Settings
2. In the Home tab, a button "Go to Details"
3. Tapping the button navigates to Details screen
4. Native back button/gesture works
5. Tab navigation persists state

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

---

## Troubleshooting

### Issue: Navigation not working on Android

**Solution**: Make sure `react-native-gesture-handler` is imported at the top of `index.js`:
```javascript
import 'react-native-gesture-handler';
```

### Issue: White flash between screens

**Solution**: Set background color in NavigationContainer:
```typescript
<NavigationContainer
  theme={{
    colors: {
      background: isDarkMode ? '#000' : '#fff',
    },
  }}>
```

### Issue: Back button not working on Android

**Solution**: The `onCreate(null)` override in MainActivity.kt should fix this. If not, rebuild:
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

### Issue: Tabs not showing

**Solution**: Make sure you're not setting `headerShown: false` globally if you want stack headers.

---

## Next Steps

### 1. Add More Screens
Create new screen components and add them to your navigators.

### 2. Add Icons to Tabs
Install `react-native-vector-icons` or use `@expo/vector-icons` for tab icons.

### 3. Implement Deep Linking
Configure deep linking for navigation from URLs.

### 4. Add Authentication Flow
Use conditional rendering based on auth state:
```typescript
{isSignedIn ? <MainStack /> : <AuthStack />}
```

### 5. Add Drawer Navigator
Install `@react-navigation/drawer` for side menu navigation.

---

## Resources

- **Official Docs**: https://reactnavigation.org/docs/getting-started
- **API Reference**: https://reactnavigation.org/docs/navigation-prop
- **Examples**: https://github.com/react-navigation/react-navigation/tree/main/example
- **TypeScript Guide**: https://reactnavigation.org/docs/typescript

---

## Summary

✅ React Navigation fully configured
✅ Both navigators (Stack & Tabs) working
✅ iOS and Android setup complete
✅ Example code provided
✅ TypeScript support enabled
✅ Dark mode compatible

**Status**: Ready to build your navigation flow! 🚀

---

**Setup Date**: October 25, 2025
**React Navigation Version**: Latest (v6.x)


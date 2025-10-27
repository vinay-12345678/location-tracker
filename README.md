# Traffic Advisor

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Quick Start

If you already have your React Native environment set up:

```sh
# Install dependencies
npm install

# For iOS (macOS only)
cd ios && export LANG=en_US.UTF-8 && bundle exec pod install && cd ..

# Start Metro bundler
npm start

# In another terminal, run the app:
npm run ios      # For iOS
# or
npm run android  # For Android
```

## Prerequisites

Before running this app, make sure you have the following installed:

### For iOS Development:
- macOS (required for iOS development)
- Xcode 15 or later
- CocoaPods (will be installed via bundler)
- Ruby (bundler will manage gem dependencies)

### For Android Development:
- Java Development Kit (JDK) 17 or later
- Android Studio (with Android SDK)
- Android SDK Platform 34 or later
- Android Virtual Device (AVD) or a physical device

### Common Requirements:
- Node.js 20 or later
- npm or Yarn
- Watchman (recommended for macOS users)

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

# Getting Started

## Step 1: Install Dependencies

First, install the npm dependencies:

```sh
npm install
```

## Step 2: iOS Setup (macOS only)

For iOS, you need to install CocoaPods dependencies. Navigate to the iOS folder and run:

```sh
cd ios
export LANG=en_US.UTF-8
bundle install
bundle exec pod install
cd ..
```

> **Note**: The `export LANG=en_US.UTF-8` command ensures proper UTF-8 encoding for CocoaPods. You only need to run `bundle install` and `pod install` once or when native dependencies change.

## Step 3: Start Metro

Metro is the JavaScript bundler for React Native. Start it with:

```sh
npm start
```

## Step 4: Run the App

With Metro running, open a new terminal window and run one of the following commands:

### For Android:

Make sure you have an Android emulator running or a device connected, then:

```sh
npm run android
```

### For iOS:

Make sure you have an iOS simulator installed or a device connected, then:

```sh
npm run ios
```

Alternatively, you can open the project in Xcode:

```sh
open ios/TrafficAdvisor.xcworkspace
```

Then press the "Run" button in Xcode.

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

> **Tip**: You can also build and run your app directly from Android Studio or Xcode for more advanced debugging and development options.

## Step 5: Modify Your App

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

# Available Scripts

The following npm scripts are available to help with development:

- `npm start` - Start the Metro bundler
- `npm run android` - Build and run the Android app
- `npm run ios` - Build and run the iOS app
- `npm run lint` - Run ESLint to check code quality
- `npm test` - Run Jest tests
- `npm run pod-install` - Install iOS dependencies (CocoaPods) with proper UTF-8 encoding
- `npm run clean` - Clean Android and iOS build folders
- `npm run clean-all` - Complete clean: removes node_modules, Pods, and reinstalls everything

# React Navigation

This project includes React Navigation with both **Native Stack** and **Bottom Tabs** navigators pre-configured.

## Navigation Structure

The app uses a combination of navigators:
- **Bottom Tab Navigator**: Main navigation between Home, Profile, and Settings
- **Native Stack Navigator**: Nested in the Home tab for detail navigation

## Example Code

The current `App.tsx` demonstrates:
- Bottom tab navigation with 3 tabs (Home, Profile, Settings)
- Stack navigation within the Home tab (Home → Details)
- Dark mode support
- TypeScript types for navigation

## Adding New Screens

To add a new screen to the stack:

```typescript
<Stack.Screen 
  name="NewScreen" 
  component={NewScreenComponent}
  options={{ title: 'New Screen' }}
/>
```

To add a new tab:

```typescript
<Tab.Screen 
  name="NewTab" 
  component={NewTabComponent}
  options={{ title: 'New Tab' }}
/>
```

## Learn More

- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)
- [Native Stack Navigator](https://reactnavigation.org/docs/native-stack-navigator)
- [Bottom Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator)

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

## Common Issues and Solutions

### iOS Build Issues

#### CocoaPods UTF-8 Encoding Error
If you encounter `Unicode Normalization not appropriate for ASCII-8BIT` error:
```sh
export LANG=en_US.UTF-8
cd ios
bundle exec pod install
cd ..
```

Or use the npm script:
```sh
npm run pod-install
```

#### Clean iOS Build
If you're experiencing persistent iOS build issues:
```sh
cd ios
xcodebuild clean -workspace TrafficAdvisor.xcworkspace -scheme TrafficAdvisor
rm -rf build
bundle exec pod install
cd ..
```

### Android Build Issues

#### Gradle Build Failures
If you encounter Gradle issues, try cleaning the build:
```sh
cd android
./gradlew clean
./gradlew assembleDebug
cd ..
```

#### Metro Bundler Port Already in Use
If Metro is already running or port 8081 is occupied:
```sh
# Find and kill the process using port 8081
lsof -ti:8081 | xargs kill -9
# Then restart Metro
npm start
```

### General Issues

#### Clean Everything and Start Fresh
If nothing else works, try a complete clean rebuild:
```sh
npm run clean-all
```

This will:
- Clean Android and iOS builds
- Remove node_modules and Pods
- Reinstall all dependencies

#### Cache Issues
Clear Metro bundler cache:
```sh
npm start -- --reset-cache
```

For more detailed troubleshooting, see the [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

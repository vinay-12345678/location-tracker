/**
 * Home Screen - Location Tracking
 */

import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  DeviceEventEmitter,
  PermissionsAndroid,
  Platform,
  Alert
} from 'react-native';
import useAppStore, { getIsTracking, toggleTracking } from '../../stores/appStore';

const { TrafficServiceModule } = NativeModules;

function Home() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? '#000' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#000';

  // Get tracking state and actions from the store
  const isTracking = useAppStore(getIsTracking);

  // Request location permissions
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      return true; // Handle iOS permissions separately
    }

    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ]);

      const allGranted = 
        granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED;

      if (!allGranted) {
        Alert.alert(
          'Permission Required',
          'Location permission is required to track traffic.',
          [{ text: 'OK' }]
        );
        return false;
      }

      return true;
    } catch (err) {
      console.warn('Permission error:', err);
      return false;
    }
  };

  const handleToggleTracking = useCallback(async () => {
    try {
      if (isTracking) {
        TrafficServiceModule.stopService();
        toggleTracking(false);
      } else {
        // Request permissions before starting
        const hasPermission = await requestLocationPermission();
        if (hasPermission) {
          TrafficServiceModule.startService();
          toggleTracking(true);
        }
      }
    } catch (error) {
      console.log('error', error);
      Alert.alert('Error', 'Failed to start tracking service');
    }
  }, [isTracking]);

  useEffect(() => {
    // Check if service is already running
    TrafficServiceModule.isServiceRunning()
      .then((running) => {
        if (running) {
          toggleTracking(true);
        }
      })
      .catch((error) => {
        console.log('Error checking service status:', error);
      });

    const subscription = DeviceEventEmitter.addListener('TrafficUpdate', (message) => {
      console.log('Traffic update from native:', message);
    });

    return () => {
      subscription.remove();
    };
  }, [])

  return (
    <View style={[styles.screen, { backgroundColor }]}>

      <View style={styles.container}>
        <Text style={[styles.title, { color: textColor }]}>Traffic Tracking</Text>

        {/* Tracking Status */}
        <View style={[
          styles.statusCard,
          { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }
        ]}>
          <Text style={[styles.statusLabel, { color: textColor }]}>Status</Text>
          <View style={[
            styles.statusIndicator,
            { backgroundColor: isTracking ? '#4CAF50' : '#9E9E9E' }
          ]} />
          <Text style={[
            styles.statusText,
            { color: isTracking ? '#4CAF50' : '#9E9E9E' }
          ]}>
            {isTracking ? 'ACTIVE' : 'INACTIVE'}
          </Text>
        </View>

        {/* Toggle Button */}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isTracking ? '#f44336' : '#4CAF50' }
          ]}
          onPress={handleToggleTracking}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </Text>
        </TouchableOpacity>

        {/* Info Text */}
        <Text style={[styles.infoText, { color: textColor }]}>
          {isTracking
            ? 'Location tracking is active. Your position is being monitored.'
            : 'Tap the button above to start tracking your location.'
          }
        </Text>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  statusCard: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    opacity: 0.7,
  },
  statusIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  button: {
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.7,
    paddingHorizontal: 20,
  },
});


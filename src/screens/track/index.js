/**
 * Profile Screen
 */

import React from 'react';
import { View, Text, useColorScheme, StyleSheet } from 'react-native';

function Track() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? '#000' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#000';

  return (
    <View style={[styles.screen, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Track Screen</Text>
      <Text style={[styles.text, { color: textColor }]}>
        Track your location here
      </Text>
    </View>
  );
}

export default Track;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
});


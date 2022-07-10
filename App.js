import React from 'react';

import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Routes } from './src/routes';

export function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#36393F"
        barStyle="light-content"
        translucent={false}
      />
      <Routes />
    </NavigationContainer>
  );
}

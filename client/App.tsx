import { Button, Pressable, Text, View } from 'react-native';
import { useState } from 'react';
// import helper from './helpers/helper.js';
import Homepage from './screens/homepage/Homepage';
import Chatscreen from './screens/chatpage/Chatscreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RunHistory from './screens/runhistory/RunHistory';

export default function App() {

  return (
    <SafeAreaView>
      <Navigation />
    </SafeAreaView>
  );
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: Homepage,
    Chat: Chatscreen,
    Runs: RunHistory
  },
});

const Navigation = createStaticNavigation(RootStack);
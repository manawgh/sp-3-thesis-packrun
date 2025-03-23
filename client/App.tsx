import { Button, Pressable, Text, View } from 'react-native';
import { useState } from 'react';
// import helper from './helpers/helper.js';
import Homepage from './screens/homepage/Homepage';
import Chatscreen from './screens/chatpage/Chatscreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RunHistory from './screens/runhistory/RunHistory';
import CurrentRun from './screens/Runtracking/CurrentRun';
/* import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' */
import BottomDash from './components/BottomDash';

export default function App() {

  return (
    <SafeAreaView style={{flex :1, backgroundColor: '#f8f8f8'}}>
      <Navigation/>
    </SafeAreaView>
  );
}

/* const NavBar = createBottomTabNavigator({
  screens: {
    Home: Homepage,
    Chat: Chatscreen,
    Runs: RunHistory,
    CurrentRun: CurrentRun
  },
}); */

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: Homepage,
      options: {
        headerShown: false,
      },
    },
    Chat: {
      screen: Chatscreen,
      options: {
        headerShown: false,
      },
    },
    Runs: {
      screen: RunHistory,
      options: {
        headerShown: false,
      },
    },
    CurrentRun: {
      screen: CurrentRun,
      options: {
        headerShown: false,
      },
    },
  }
  /* initialRouteName: 'Home',
  screens: {
    Home: Homepage,           
    Chat: Chatscreen,
    Runs: RunHistory,
    CurrentRun: CurrentRun
  }, */
});

const Navigation = createStaticNavigation(RootStack);
import { Button, Pressable, Text, View } from 'react-native';
import { useState } from 'react';
// import helper from './helpers/helper.js';
import Homepage from './screens/homepage/Homepage';
import Chatscreen from './screens/chatpage/Chatscreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  // const [maptxt, setMapText] = useState('');

  // function getLocation() {
  //   setMapText('getting gps position...');
  //   helper.Android.GPS.getLocation(setMapText);
  // }

  return (
    <SafeAreaView>
      <Navigation />
    </SafeAreaView>
  );
}

const RootStack = createNativeStackNavigator({
  screens: {
    Home: Homepage,
    Chat: Chatscreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

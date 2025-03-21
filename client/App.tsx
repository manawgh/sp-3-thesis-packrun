// App.tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Homepage from './screens/homepage/Homepage';
import Chatscreen from './screens/chatpage/Chatscreen';
import RunHistory from './screens/runhistory/RunHistory';
import CurrentRun from './screens/Runtracking/CurrentRun';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { RunProvider } from './context/RunContext';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: Homepage,
    Chat: Chatscreen,
    Runs: RunHistory,
    CurrentRun: CurrentRun
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <SafeAreaView>
      <RunProvider>
        <Navigation />
      </RunProvider>
    </SafeAreaView>
  );
}

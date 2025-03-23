// react native
import { SafeAreaView } from 'react-native-safe-area-context';

// navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import HomePage from './screens/homepage/HomePage';
import RunTracking from './screens/runtracking/RunTracking';
import RunHistory from './screens/runhistory/RunHistory';
import ChatScreen from './screens/chatscreen/ChatScreen';
/* import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' */

export default function App() {

  return (
    <SafeAreaView style={{flex :1, backgroundColor: '#f8f8f8'}}>
      <Navigation/>
    </SafeAreaView>
  );
}

/* const NavBar = createBottomTabNavigator({
  screens: {
  },
}); */

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: HomePage,
      options: {
        headerShown: false,
      }
    },
    Track: {
      screen: RunTracking,
      options: {
        headerShown: false,
      }
    },
    Runs: {
      screen: RunHistory,
      options: {
        headerShown: false,
      }
    },
    Chat: {
      screen: ChatScreen,
      options: {
        headerShown: false,
      }
    }
  }
});

const Navigation = createStaticNavigation(RootStack);
// react native
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { useEffect, useState } from 'react';

// navigation
import HomePage from './screens/homepage/HomePage';
import RunTracking from './screens/runtracking/RunTracking';
import RunHistory from './screens/runhistory/RunHistory';
import ChatScreen from './screens/chatscreen/ChatScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// location upon app open
import helper from './helpers/helper';
import { LocationObject } from 'expo-location';

const icons = {
  run: require('./assets/run.png'),
  metrics: require('./assets/metrics.png'),
  history: require('./assets/history.png'),
  chat: require('./assets/chat.png'),
}

export default function App() {

  const NavBar = createBottomTabNavigator();

    // State for initial location
    const [initialLocation, setInitialLocation] = useState<LocationObject | null>(null);

    useEffect(() => {
      const fetchLocation = async () => {
        const location = await helper.getLocation();
        setInitialLocation(location);
      };
      fetchLocation();
    }, []);

  return (
    <SafeAreaView style={{flex :1, backgroundColor: '#ffffff'}}>
      <NavigationContainer>
        <NavBar.Navigator screenOptions={{headerShown: true, tabBarShowLabel: false, tabBarStyle: {height: 100, paddingTop: 20}}}>
          <NavBar.Screen name={'Run'} options={{tabBarIcon:({focused})=>(
            <Image source={icons.run} style={{width:37, height:37, tintColor: focused ? '#3B98FF' : '#000000'}}/>
          )}}>{() => <HomePage initialLocation={initialLocation} />}</NavBar.Screen>
          <NavBar.Screen name='Metrics' component={RunTracking} options={{tabBarIcon:({focused})=>(
            <Image source={icons.metrics} style={{width:37, height:37, tintColor: focused ? '#3B98FF' : '#000000'}}/>
          )}}/>
          <NavBar.Screen name='History' component={RunHistory} options={{tabBarIcon:({focused})=>(
            <Image source={icons.history} style={{width:37, height:37, tintColor: focused ? '#3B98FF' : '#000000'}}/>
          )}}/>
          <NavBar.Screen name='Chat' component={ChatScreen} options={{tabBarIcon:({focused})=>(
            <Image source={icons.chat} style={{width:37, height:37, tintColor: focused ? '#3B98FF' : '#000000'}}/>
          )}}/>
        </NavBar.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
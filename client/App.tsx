// react native
import { SafeAreaView } from 'react-native-safe-area-context';
<<<<<<< HEAD

// navigation
import HomePage from './screens/homepage/Homepage';
import RunTracking from './screens/runtracking/CurrentRun';
import RunHistory from './screens/runhistory/RunHistory';
import ChatScreen from './screens/chatpage/Chatscreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
=======
import { Image } from 'react-native';

// navigation
import HomePage from './screens/homepage/HomePage';
import RunTracking from './screens/runtracking/RunTracking';
import RunHistory from './screens/runhistory/RunHistory';
import ChatScreen from './screens/chatscreen/ChatScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const icons = {
  run: require('./assets/run.png'),
  metrics: require('./assets/metrics.png'),
  history: require('./assets/history.png'),
  chat: require('./assets/chat.png'),
}
>>>>>>> 9473ac8ede94b65356bd70f7ca3508066cad59c9

export default function App() {

  const NavBar = createBottomTabNavigator();
<<<<<<< HEAD
  const screenOptions = {
    headerShown: false,
  }

  return (
    <SafeAreaView style={{flex :1, backgroundColor: '#f8f8f8'}}>
      <NavigationContainer>
        <NavBar.Navigator screenOptions={screenOptions}>
          <NavBar.Screen name='Home' component={HomePage}/>
          <NavBar.Screen name='Track' component={RunTracking}/>
          <NavBar.Screen name='History' component={RunHistory}/>
          <NavBar.Screen name='Chat' component={ChatScreen}/>
=======

  return (
    <SafeAreaView style={{flex :1, backgroundColor: '#ffffff'}}>
      <NavigationContainer>
        <NavBar.Navigator screenOptions={{headerShown: true, tabBarShowLabel: false, tabBarStyle: {height: 100, paddingTop: 20}}}>
          <NavBar.Screen name={'Run'} component={HomePage} options={{tabBarIcon:({focused})=>(
            <Image source={icons.run} style={{width:37, height:37, tintColor: focused ? '#3B98FF' : '#000000'}}/>
          )}}/>
          <NavBar.Screen name='Metrics' component={RunTracking} options={{tabBarIcon:({focused})=>(
            <Image source={icons.metrics} style={{width:37, height:37, tintColor: focused ? '#3B98FF' : '#000000'}}/>
          )}}/>
          <NavBar.Screen name='History' component={RunHistory} options={{tabBarIcon:({focused})=>(
            <Image source={icons.history} style={{width:37, height:37, tintColor: focused ? '#3B98FF' : '#000000'}}/>
          )}}/>
          <NavBar.Screen name='Chat' component={ChatScreen} options={{tabBarIcon:({focused})=>(
            <Image source={icons.chat} style={{width:37, height:37, tintColor: focused ? '#3B98FF' : '#000000'}}/>
          )}}/>
>>>>>>> 9473ac8ede94b65356bd70f7ca3508066cad59c9
        </NavBar.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
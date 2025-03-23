// react native
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';

// navigation
import HomePage from './screens/homepage/HomePage';
import RunTracking from './screens/runtracking/RunTracking';
import RunHistory from './screens/runhistory/RunHistory';
import ChatScreen from './screens/chatscreen/ChatScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const icons = {
  home: require('./assets/home.png'),
  track: require('./assets/home.png'),
  history: require('./assets/history.png'),
  chat: require('./assets/chat.png'),
}

export default function App() {

  const NavBar = createBottomTabNavigator();

  return (
    <SafeAreaView style={{flex :1, backgroundColor: '#ffffff'}}>
      <NavigationContainer>
        <NavBar.Navigator screenOptions={{headerShown: true, tabBarShowLabel: false, tabBarStyle: {height: 100, paddingTop: 20}}}>
          <NavBar.Screen name={'Home'} component={HomePage} options={{tabBarIcon:({})=>(
            <Image source={icons.home} style={{width:37, height:37}}/>
          )}}/>
          <NavBar.Screen name='Track' component={RunTracking} options={{tabBarIcon:({})=>(
            <Image source={icons.track} style={{width:37, height:37}}/>
          )}}/>
          <NavBar.Screen name='History' component={RunHistory} options={{tabBarIcon:({})=>(
            <Image source={icons.history} style={{width:37, height:37}}/>
          )}}/>
          <NavBar.Screen name='Chat' component={ChatScreen} options={{tabBarIcon:({})=>(
            <Image source={icons.chat} style={{width:37, height:37}}/>
          )}}/>
        </NavBar.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
import { Button, Pressable, Text, View } from 'react-native';
import { useState } from 'react';
// import helper from './helpers/helper.js';
import Homepage from './screens/homepage/Homepage';

export default function App() {
  // const [maptxt, setMapText] = useState('');

  // function getLocation() {
  //   setMapText('getting gps position...');
  //   helper.Android.GPS.getLocation(setMapText);
  // }

  return (
    <Homepage />
  );
}


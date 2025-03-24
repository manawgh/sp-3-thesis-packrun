import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import BottomDash from '../../components/BottomDash';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';
import RootStackParamList from '../../components/types';

export default function Homepage() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 5.603717,
    longitude: -0.186964,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    let subscriber: Location.LocationSubscription;
    const subscribeToLocation = async () => {
      // Request permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error("Permission to access location was denied");
        return;
      }
      
      // Subscribe to location updates
      subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Update every 1 second
          distanceInterval: 1, // Or when the user moves 1 meter
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          // Update the region state to center on the user's new location
          setMapRegion((prevRegion) => ({
            ...prevRegion,
            latitude,
            longitude,
          }));
        }
      );
    };

    subscribeToLocation();

    // Clean up the subscription on unmount
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topdash}>
          <Text style={styles.dashtext}>Great day for a run.</Text>
        </View>
        <View style={styles.mapcontainer}>
          <MapView style={styles.mapview} region={mapRegion}>
            {/* Moving marker */}
            <Marker coordinate={mapRegion} />

            <TouchableOpacity 
              style={styles.startbtn} 
              onPress={() => navigation.navigate('CurrentRun')}
            >
              <View style={{ transform: [{ rotate: '-45deg' }] }}>
                <Text style={styles.startbtntext}>Run!</Text>
              </View>
            </TouchableOpacity>
          </MapView>
        </View>
      </View>
    </SafeAreaView>
  );
}

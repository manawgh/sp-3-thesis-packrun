// react native
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
<<<<<<< HEAD
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import BottomDash from '../../components/BottomDash';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
=======

// helpers
import helpers from '../../helpers/helper';

// maplibre
import { MapView, Camera, MarkerView } from '@maplibre/maplibre-react-native';

// styling
import global from '../../global'
>>>>>>> 9473ac8ede94b65356bd70f7ca3508066cad59c9
import styles from './styles';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Homepage() {
<<<<<<< HEAD
  const [mapRegion, setMapRegion] = useState({
    latitude: 51.145275,
    longitude: 0.335759,
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
          timeInterval: 10000, // Update every 10 seconds
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

    // send location to server
    async function sendLocationToServer() {
      const response = await fetch(`http://192.168.68.100:3000/location`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'xXBobmanXx', longitude: mapRegion.longitude, latitude: mapRegion.latitude}), 
      });
      if (!response.ok) throw new Error('Failed to send location');
        
      const sentLocation = await response.json();
      console.log('location saved:', sentLocation);
    }
    sendLocationToServer()

    // sending location for testing: 

    async function sendBotLocationToServer() {
      const response = await fetch(`http://192.168.68.100:3000/location`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'Bertha Coolshoes', longitude: 0.335859, latitude: 51.145275}), 
      });
      if (!response.ok) throw new Error('Failed to send location');
        
      const sentLocation = await response.json();
      console.log('botlocation saved:', sentLocation);
    }
    sendBotLocationToServer()

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
=======

    const apiKey = 'aeeb6ec8-5770-404c-8f6d-271cad7b3798';
    const styleURL = `https://tiles.stadiamaps.com/styles/outdoors.json?api_key=${apiKey}`;
    const [coords, setCoords] = useState<number[]>([]);
    const [running, setRunning] = useState(true);
    const [longIntervalID, setLID] = useState<NodeJS.Timeout>(0);
    const [shortIntervalID, setSID] = useState<NodeJS.Timeout>(0);
    const [markerHack, setMarkerHack] = useState(false);
    // const [route, setRoute] = useState();

    useEffect(() => {
        helpers.getLocation()
        .then( locationObject => setCoords([locationObject.coords.longitude, locationObject.coords.latitude]))
        sparseTracking();
    }, []);

    //
    useEffect(() => {
        setTimeout( () => {
            setMarkerHack(true);
        }, 100);
    }, [coords.length]);

    function sparseTracking () {
        setRunning(!running);
        clearInterval(shortIntervalID);
        setLID(setInterval( () => helpers.getNearestChatroom(), 300000 ));
    }
    
    function denseTracking () {
        setRunning(!running);
        clearInterval(longIntervalID);
        setSID(setInterval( () => {
            const route = helpers.trackCurrentRun();

        }, 10000 ))
    }

    return (
        <SafeAreaView>
            <View style={global.container}>
                <View style={styles.mapcontainer}>
                    
                    { coords.length
                    ?
                    <MapView style={styles.mapview} mapStyle={styleURL} zoomEnabled={true} rotateEnabled={false}>
                        
                        <Camera zoomLevel={14} centerCoordinate={coords} />

                        <MarkerView coordinate={coords}>
                            <AntDesign name="enviroment" size={48} color="black" />
                        </MarkerView>

                        {/* { route &&
                        <ShapeSource shape={route}/>
                        
                        } */}

                        { running
                        ?
                        <TouchableOpacity style={styles.stopbtn} onPress={sparseTracking}>
                            <View style={{ transform: [{ rotate: '-45deg' }] }}>
                                <Text style={styles.btntext}>Stop</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.startbtn} onPress={denseTracking}>
                        <View style={{ transform: [{ rotate: '-45deg' }] }}>
                            <Text style={styles.btntext}>Start</Text>
                        </View>
                        </TouchableOpacity>
                        }
                    </MapView>
                    :
                    <View></View>}       
                </View>
            </View>
        </SafeAreaView>
    );
}
>>>>>>> 9473ac8ede94b65356bd70f7ca3508066cad59c9

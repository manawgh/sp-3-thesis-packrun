// react native
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

// helpers
import helpers from '../../helpers/helper';

// maplibre
import { MapView, Camera, MarkerView } from '@maplibre/maplibre-react-native';

// styling
import global from '../../global'
import styles from './styles';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Homepage() {

    const apiKey = 'aeeb6ec8-5770-404c-8f6d-271cad7b3798';
    const styleURL = `https://tiles.stadiamaps.com/styles/outdoors.json?api_key=${apiKey}`;
    const [coords, setCoords] = useState<number[]>([]);
    const [running, setRunning] = useState(true);
    const [longIntervalID, setLID] = useState<NodeJS.Timeout | null>(null);
    const [shortIntervalID, setSID] = useState<NodeJS.Timeout | null>(null);
    const [markerHack, setMarkerHack] = useState(false);
    // const [route, setRoute] = useState();

    useEffect(() => {
        const fetchInitialLocation = async () => {
            try {
              const locationObject = await helpers.getLocation();
              setCoords([locationObject.coords.longitude, locationObject.coords.latitude]);
            } catch (error) {
              console.error('Failed to fetch initial location:', error);
            }
          };
      
          fetchInitialLocation();
          sparseTracking();
    }, []);

    useEffect(() => {
            // send location to server
        helpers.getNearestChatroom()
  
      // sending a bot location for testing chat rooms: 
  
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

    }, []);

    useEffect(() => {
        setTimeout( () => {
            setMarkerHack(true);
        }, 100);
    }, [coords.length]);

    function sparseTracking () {
        setRunning(!running);
        if (shortIntervalID) clearInterval(shortIntervalID);
        setLID(setInterval( () => helpers.getNearestChatroom(), 300000 ));
    }
    
    function denseTracking () {
        setRunning(!running);
        if (longIntervalID) clearInterval(longIntervalID);
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

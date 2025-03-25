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
        setLID(setInterval( () => helpers.getNearestChatroom(), 3000 ));
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
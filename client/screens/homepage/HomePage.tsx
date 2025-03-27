// react native
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

// helpers
import helpers from '../../helpers/helper';

// maplibre
import { MapView, Camera, MarkerView, ShapeSource, LineLayer, LineLayerStyle } from '@maplibre/maplibre-react-native';

// styling
import global from '../../global'
import styles from './styles';
import AntDesign from '@expo/vector-icons/AntDesign';

// TESTING THE REAL-TIME MAP RENDERING (PART 1)

import { sendToAPI } from '../../helpers/data'

function* getNextObject () {
    const obj = sendToAPI;
    const progress = {
        "mode":"walk",
        "waypoints":[
            {"timestamp":"2025-01-31T12:32:52.000Z","location":[13.515031,52.468795]}
        ]}
    for (let i=1; i <= obj.waypoints.length-1; i++) {
        progress.waypoints.push(obj.waypoints[i]);
        console.log(progress);
        yield progress;
    }
}

const waypointsGenerator = getNextObject(); 

export default function HomePage() {

    const apiKey = 'aeeb6ec8-5770-404c-8f6d-271cad7b3798';
    const styleURL = `https://tiles.stadiamaps.com/styles/outdoors.json?api_key=${apiKey}`;
    const [coords, setCoords] = useState<number[]>([]);
    const [running, setRunning] = useState(true);
    const [longIntervalID, setLID] = useState<NodeJS.Timeout | null>(null);
    const [shortIntervalID, setSID] = useState<NodeJS.Timeout | null>(null);
    const [markerHack, setMarkerHack] = useState(false);
    const [route, setRoute] = useState<GeoJSON.FeatureCollection>();


    useEffect(() => {
        timeout();
        helpers.getLocation()
        .then( locationObject => setCoords([locationObject.coords.longitude, locationObject.coords.latitude]))
        sparseTracking();
    }, []);

    // hack: makes sure the marker appears on initial load
    useEffect(() => {
        setTimeout( () => {
            setMarkerHack(true);
        }, 100);
    }, [coords.length]);

    function sparseTracking () {
        setRunning(!running);
        if (shortIntervalID !== null) {
            clearInterval(shortIntervalID);
        }
        
        // setLID(setInterval( () => helpers.getNearestChatroom(), 3000 ));
    }
    
    function denseTracking () {
        setRunning(!running);
        if (longIntervalID !== null) {
            clearInterval(longIntervalID);
        }
        console.log('hello');
        // setSID(setInterval( () => helpers.trackCurrentRun(), 10000))
        /* setSID(setInterval( () => {
            helpers.trackCurrentRun(), 10000})) */
            /* .then( (responseFromAPI: GeoJSON.FeatureCollection | undefined) => { // todo: check if first or last point?
                if (responseFromAPI) {
                    setCoords([responseFromAPI.features[0].properties!.waypoints[0].location[0], responseFromAPI.features[0].properties!.waypoints[0].location[1]]);
                    setRoute(responseFromAPI);
                }
            }) */
    }

    // TESTING THE REAL-TIME MAP RENDERING (PART 2)

    async function timeout () {
        console.log('INVOKING TIMEOUT');
        const { done, value: waypoints } = waypointsGenerator.next();
            if (done) return;
            try {
                const response = await fetch('https://api.geoapify.com/v1/mapmatching?apiKey=195e52b3f3a64bdb903a12bf0fea9ca7', {
                    method: 'POST',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(waypoints)
                })
            const veroute = await response.json();
            console.log(veroute);
            setRoute(veroute);
            setTimeout(timeout, 100);
        }
        catch (error) { console.log(error)}
    } 


    return (
        <SafeAreaView>
            <View style={global.container}>
                <View style={styles.mapcontainer}>
                    
                    { coords.length
                    ?
                    <MapView style={styles.mapview} mapStyle={styleURL} zoomEnabled={true} rotateEnabled={false}>
                        
                        <Camera zoomLevel={16} centerCoordinate={coords} />

                        <MarkerView coordinate={coords}>
                            <AntDesign name="enviroment" size={48} color="black" />
                        </MarkerView>

                        { route
                        ?
                        <ShapeSource id={'route'} shape={route}>
                                <LineLayer id='route-style' style={lineStyle}/>
                        </ShapeSource>
                        :
                        <View></View>
                        }

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

const lineStyle: LineLayerStyle = {
    lineColor: 'blue',
    lineWidth: 5
  };

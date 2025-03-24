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
    const [running, setRunning] = useState(false);

    useEffect(() => {
        helpers.getLocation()
        .then( locationObject => setCoords([locationObject.coords.longitude, locationObject.coords.latitude]))
        .then(() => console.log(coords)); // todo: get rid of later
        track();
    }, [running]);

    function track () {
        console.log(running);
        const longIntervalID = setInterval( () => helpers.getNearestChatroom(running, shortIntervalID), 3000 )
        const shortIntervalID = setInterval( () => helpers.trackCurrentRun(running, longIntervalID), 10000 )
        console.log(longIntervalID);
        console.log(shortIntervalID);
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

                            { running
                            ?
                            <TouchableOpacity style={styles.stopbtn} onPress={()=>setRunning(!running)}>
                                <View style={{ transform: [{ rotate: '-45deg' }] }}>
                                    <Text style={styles.btntext}>Stop</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.startbtn} onPress={()=>setRunning(!running)}>
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
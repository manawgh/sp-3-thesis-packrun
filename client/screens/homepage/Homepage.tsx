// react native
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

// helpers
import helpers from '../../helpers/helper';

// navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../../components/types';

// maplibre
import { MapView, Camera, MarkerView } from '@maplibre/maplibre-react-native';

// styling
import global from '../../global'
import styles from './styles';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function Homepage() {

    const apiKey = 'aeeb6ec8-5770-404c-8f6d-271cad7b3798';
    const styleURL = `https://tiles.stadiamaps.com/styles/outdoors.json?api_key=${apiKey}`;
    const [coords, setCoords] = useState([]);

    useEffect(() => {
        helpers.Android.GPS.getLocation(setCoords).then(() => console.log(coords));
    }, []);

    return (
        <SafeAreaView>
            <View style={global.container}>

                {/* <View style={global.topdash}>
                    <Text style={global.dashtext}>Great day for a run!</Text>
                </View> */}
                
                <View style={styles.mapcontainer}>
                    { coords.length
                        ?
                        <MapView style={styles.mapview} mapStyle={styleURL} zoomEnabled={true} rotateEnabled={false}>
                            
                            <Camera zoomLevel={14} centerCoordinate={coords} />

                            <MarkerView coordinate={coords}>
                                <AntDesign name="enviroment" size={48} color="black" />
                            </MarkerView>

                            <TouchableOpacity style={styles.startbtn}>
                                <View style={{ transform: [{ rotate: '-45deg' }] }}>
                                    <Text style={styles.startbtntext}>Start</Text>
                                </View>
                            </TouchableOpacity>
                        </MapView>
                        :
                        <View></View>}       
                </View>
            </View>
        </SafeAreaView>
    );
}
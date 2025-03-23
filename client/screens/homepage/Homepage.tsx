import React, { useEffect, useState } from 'react';
import { Text, View, PermissionsAndroid, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
// import MapView from 'react-native-maps';
import { MapView, Camera, MarkerView } from '@maplibre/maplibre-react-native';
// import MapLibreGL from '@maplibre/maplibre-react-native';
import BottomDash from '../../components/BottomDash';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import helpers from '../../helpers/helper';
import styles from './styles';
import RootStackParamList from '../../components/types';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Homepage() {

    const apiKey = 'aeeb6ec8-5770-404c-8f6d-271cad7b3798';
    const styleURL = `https://tiles.stadiamaps.com/styles/outdoors.json?api_key=${apiKey}`;
    const [coords, setCoords] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        helpers.Android.GPS.getLocation(setCoords, setText).then(() => console.log(coords));
    }, []);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    return (
        <SafeAreaView>
            <View style={styles.container}>

                <View style={styles.topdash}>
                    <Text style={styles.dashtext}>Great day for a run!</Text>
                </View>

                <View style={styles.mapcontainer}>
                    {coords.length
                        ?
                        <MapView style={styles.mapview} mapStyle={styleURL} zoomEnabled={true} rotateEnabled={false}>
                            
                            <Camera zoomLevel={15} centerCoordinate={coords} />

                            <MarkerView coordinate={coords}>
                                <AntDesign name="enviroment" size={48} color="black" />
                            </MarkerView>

                            <TouchableOpacity style={styles.startbtn} onPress={() => navigation.navigate('CurrentRun')}>
                                <View style={{ transform: [{ rotate: '-45deg' }] }}>
                                    <Text style={styles.startbtntext}>Start</Text>
                                </View>
                            </TouchableOpacity>
                        </MapView>

                        :
                        <View></View>}
                            
                </View>
                <BottomDash />

            </View>
        </SafeAreaView>
    );
}

const mapStyles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
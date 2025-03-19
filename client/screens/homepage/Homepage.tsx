import React, { useEffect, useState } from 'react';
import { Text, View, PermissionsAndroid, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import DashButton from '../../components/DashButton/DashButton';
import MapView from 'react-native-maps';
// import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import styles from './styles';

const icons = {
    run: require('../../assets/running.png'),
    messages: require('../../assets/messages.png'),
    list: require('../../assets/rectangle-list.png'),
}

export default function Homepage() {
    return (
    <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.topdash}>
                <Text style={styles.dashtext}>Great day for a run.</Text>
            </View>
            <View style={styles.mapcontainer}>
                <MapView style={styles.mapview}>
                    <TouchableOpacity style={styles.startbtn}>
                        <View style={{transform: [{ rotate: '-45deg' }]}}>
                        <Text style={styles.startbtntext}>Start</Text>
                        </View>
                    </TouchableOpacity>
                </MapView>
            </View>
            <View style={styles.bottomdash}>
                <DashButton image={icons.list} />
                <DashButton image={icons.run} />
                <DashButton image={icons.messages} />
            </View>
        </View>
     </SafeAreaView>
    );
}
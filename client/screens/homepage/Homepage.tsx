import React, { useEffect, useState } from 'react';
import { Text, View, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import DashButton from '../../components/DashButton/DashButton';
import MapView from 'react-native-maps';
import styles from './styles';

const icons = {
    run: require('../../assets/running.png'),
    messages: require('../../assets/messages.png'),
    list: require('../../assets/rectangle-list.png'),
}

export default function Homepage() {
    return (
        <View style={styles.container}>
            <View style={styles.topdash}>
                <Text style={styles.dashtext}>Great day for a run.</Text>
            </View>
            <MapView
                style={styles.mapview}
                showsUserLocation={true}
                followsUserLocation={true}
            >
                <TouchableOpacity style={styles.startbtn}>
                    <Text style={styles.startbtntext}>Start</Text>
                </TouchableOpacity>
            </MapView>
            <View style={styles.bottomdash}>
                <DashButton image={icons.list} />
                <DashButton image={icons.run} />
                <DashButton image={icons.messages} />
            </View>
        </View>
    );
}
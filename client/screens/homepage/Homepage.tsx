import React, { useEffect, useState } from 'react';
import { Text, View, PermissionsAndroid, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView from 'react-native-maps';
import BottomDash from '../../components/BottomDash';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';
import RootStackParamList from '../../components/types';

export default function Homepage() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    return (
    <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.topdash}>
                <Text style={styles.dashtext}>Great day for a run.</Text>
            </View>
            <View style={styles.mapcontainer}>
                <MapView style={styles.mapview}>
                    <TouchableOpacity style={styles.startbtn} onPress={() => navigation.navigate('CurrentRun')}>
                        <View style={{transform: [{ rotate: '-45deg' }]}}>
                            <Text style={styles.startbtntext}>Run!</Text>
                        </View>
                    </TouchableOpacity>
                </MapView>
            </View>
            <BottomDash />
        </View>
     </SafeAreaView>
    );
}
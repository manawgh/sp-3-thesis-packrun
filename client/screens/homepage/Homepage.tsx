import React, { useEffect, useState } from 'react';
import { Text, View, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import styles from './styles';

export default function Homepage() {
    const [location, setLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'This app needs access to your location.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentLocation();
                } else {
                    console.log('Location permission denied');
                }
            } else {
                getCurrentLocation();
            }
        };

        const getCurrentLocation = () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        ...location,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        };

        requestLocationPermission();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapview}
                region={location}
                showsUserLocation={true}
                followsUserLocation={true}
            >
                <UrlTile
                    urlTemplate="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                />
                <Marker coordinate={location} />
            </MapView>
        </View>
    );
}
import {Text, View, TouchableOpacity, Image, ImageSourcePropType} from 'react-native';
import React from 'react';
import styles from './styles';

interface DashButtonProps {
    image: ImageSourcePropType;
    // onPress: () => void;
}

export default function DashButton({image}: DashButtonProps) {
    return (
        <TouchableOpacity style={styles.dashbutton}>
            <View style={styles.imageContainer}>
                <Image style={styles.icon} source={image} />
            </View>
        </TouchableOpacity>
    );
}
import {Text, View, TouchableOpacity, Image, ImageSourcePropType} from 'react-native';
import React from 'react';
import styles from './styles';

interface DashButtonProps {
    image: ImageSourcePropType;
    onPress: () => void;
}

export default function DashButton({image, onPress}: DashButtonProps) {
    return (
        <TouchableOpacity style={styles.dashbutton} onPress={onPress}>
            <View style={styles.imageContainer}>
                <Image style={styles.icon} source={image} />
            </View>
        </TouchableOpacity>
    );
}
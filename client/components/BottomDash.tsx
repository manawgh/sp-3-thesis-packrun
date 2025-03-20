import React from 'react';
import { Text, View } from 'react-native';
import DashButton from './DashButton';
import styles from './styles';
// navigation imports:
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from './types';

const icons = {
    run: require('../assets/running.png'),
    messages: require('../assets/messages.png'),
    list: require('../assets/rectangle-list.png'),
}

export default function BottomDash() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={styles.bottomdash}>
            <DashButton image={icons.list} onPress={() => navigation.navigate('Runs')}/>
            <DashButton image={icons.run} onPress={() => navigation.navigate('Home')}/>
            <DashButton image={icons.messages} onPress={() => navigation.navigate('Chat')} />
        </View>
    );
}
import React from 'react';
import { Text, View } from 'react-native';
import DashButton from './DashButton';
import styles from './styles';

type RootStackParamList = {
    RunHistory: undefined;
    Homepage: undefined;
    ChatScreen: undefined;
};

const icons = {
    run: require('../../assets/running.png'),
    messages: require('../../assets/messages.png'),
    list: require('../../assets/rectangle-list.png'),
}

export default function BottomDash() {

    return (
        <View style={styles.bottomdash}>
            <DashButton image={icons.list} />
            <DashButton image={icons.run} />
            <DashButton image={icons.messages} />
        </View>
    );
}
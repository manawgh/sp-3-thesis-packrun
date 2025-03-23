import { Text, View } from 'react-native';
import global from '../../global'

export default function CurrentRun() {
    return (
        <>
        <View style={global.container}>
            <View style={global.topdash}>
                <Text style={global.dashtext}>Run.</Text>
            </View>
        </View>
        </>
    );
}
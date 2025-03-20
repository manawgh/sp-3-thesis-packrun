import { Text, View } from 'react-native';
import styles from './styles'

export default function CurrentRun() {
    return (
        <>
        <View style={styles.container}>
            <View style={styles.topdash}>
                <Text style={styles.dashtext}>Run.</Text>
            </View>
        </View>
        </>
    );
}
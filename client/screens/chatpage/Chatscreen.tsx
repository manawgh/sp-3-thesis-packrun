import { Text, View } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Chatscreen() {

    return (
        <>
        <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.topdash}>

            </View>
            <Text>
                Welcome to the Chatscreen
            </Text>
        </View>
        </SafeAreaView>
        </>
    )
}
import { Text, View } from 'react-native';
import styles from './styles';
import BottomDash from '../../components/BottomDash';

export default function RunHistory() {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.topdash}>
                    <Text style={styles.dashtext}>Runs</Text>
                </View>
            </View>
            <BottomDash/>
        </>
    );
}
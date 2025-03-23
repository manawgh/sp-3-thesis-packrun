import { Text, View } from 'react-native';
import global from '../../global';
import BottomDash from '../../components/BottomDash';

export default function RunHistory() {
    return (
        <>
            <View style={global.container}>
                <View style={global.topdash}>
                    <Text style={global.dashtext}>Runs</Text>
                </View>
            </View>
            <BottomDash/>
        </>
    );
}
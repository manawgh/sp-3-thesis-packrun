// react native
import { Text, View } from 'react-native';
import { LineChart } from "react-native-gifted-charts"

// styling
import global from '../../global';
const lineData = [{value: 0},{value: 20},{value: 18},{value: 40},{value: 36},{value: 60},{value: 54},{value: 85}];

export default function RunHistory() {
    return (
        <View style={global.container}>
            <View>
                <LineChart
                areaChart
                hideDataPoints
                animationDuration={1200}
                startFillColor="#0BA5A4"
                startOpacity={1}
                endOpacity={0.3}
                initialSpacing={0}
                data={lineData}
                spacing={30}
                thickness={5}
                hideRules
                hideYAxisText
                yAxisColor="#0BA5A4"
                showVerticalLines
                verticalLinesColor="rgba(14,164,164,0.5)"
                xAxisColor="#0BA5A4"
                color="#0BA5A4"
                />
            </View>
        </View>
    );
}
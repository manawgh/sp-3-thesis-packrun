// react native
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, FlatList } from 'react-native';

// socket.io
import { io } from 'socket.io-client';

// chart
import { LineChart } from "react-native-gifted-charts"

// styling
import global from '../../global';
import styles from './styles';

// mock runs + date & elev. profile
const lineRun1 = [{value: 20},{value: 21},{value: 18},{value: 23},{value: 20},{value: 21},{value: 19},{value: 24}];
const lineRun2 = [{value: 21},{value: 23},{value: 19},{value: 20},{value: 18},{value: 21},{value: 19},{value: 19}];
const lineRun3 = [{value: 21},{value: 22},{value: 18},{value: 19},{value: 17},{value: 22},{value: 21},{value: 22}];
const lineRun4 = [{value: 18},{value: 21},{value: 18},{value: 20},{value: 19},{value: 23},{value: 20},{value: 19}];

const mockRuns = [
    { id: '4', date: '22 Mar 2025', time: '13:08', pace: '5:08/km', distance: '2.56km', profile: lineRun4},
    { id: '3', date: '20 Mar 2025', time: '16:07', pace: '5:00/km', distance: '3.21km', profile: lineRun3},
    { id: '2', date: '18 Mar 2025', time: '14:11', pace: '4:43/km', distance: '3.00km', profile: lineRun2},
    { id: '1', date: '15 Mar 2025', time: '39:23', pace: '5:37/km', distance: '7.00km', profile: lineRun1},
];

const socket = io('http://192.168.1.192', { transports: ['websocket'] });

export default function RunHistory() {

    const [runs, setRuns] = useState<{ id: string; date: string; time: string; pace: string; distance: string; elevation: string }[]>([]);
    const flatListRef = useRef<FlatList>(null);

    const getRuns = async () => {
    const response = await fetch(`http://192.168.1.192:3000/runs/xXBobmanXx`);
    if (!response.ok) throw new Error('Failed to fetch runs');
    const resp = await response.json();
    setRuns(resp);
  };

  useEffect(() => {
    socket.on('stoprun', (run: { id: string; date: string; time: string; pace: string; distance: string; elevation: string }) => {
      setRuns(prev => [...prev, run]);
    });
    setRuns(mockRuns);
    return () => {
      socket.off('stoprun');
    };
  }, []);


  return (
    <View style={styles.container}>
      <FlatList style={styles.listContainer} ref={flatListRef} data={runs} keyExtractor={(item) => item.id} renderItem={({ item }) => (

          <View style={styles.runCard}>

            <View style={styles.runHeader}>
              <Text style={styles.runTitle}>Run #{item.id}</Text>
              <Text style={styles.runDate}>{item.date}</Text>
            </View>

            <View style={styles.runHeader}>

              <View style={styles.runRow}>
                <Text style={styles.runLabel}>Time: </Text>
                <Text style={styles.runValue}>{item.time}</Text>
              </View>

              <View style={styles.runRow}>
                <Text style={styles.runLabel}>Dist.: </Text>
                <Text style={styles.runValue}>{item.distance}</Text>
              </View>

              <View style={styles.runRow}>
                <Text style={styles.runLabel}>Pace: </Text>
                <Text style={styles.runValue}>{item.pace}</Text>
              </View>

            </View>

            <View style={styles.runHeader}>
              <View>
                <LineChart areaChart height={60} hideDataPoints startFillColor="#4A90E2" startOpacity={1} endOpacity={0.3} initialSpacing={0} data={item.profile} spacing={50} thickness={3} hideRules hideYAxisText yAxisColor="#0BA5A4" xAxisColor="#0BA5A4" color="#4A90E2"/>
              </View>
            </View>
              
          </View>
        )}
      />
    </View>
  );
}
    
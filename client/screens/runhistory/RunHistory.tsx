import React, { useEffect, useRef, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import { io } from 'socket.io-client';

const socket = io('http://192.168.68.100:3000', { transports: ['websocket'] });

export default function RunHistory() {
  const [runs, setRuns] = useState<
    { id: string; date: string; time: string; pace: string; distance: string; elevation: string }[]
  >([]);
  const flatListRef = useRef<FlatList>(null);

  const getRuns = async () => {
    const response = await fetch(`http://192.168.68.100:3000/tracks/xXBobmanXx`);
    if (!response.ok) throw new Error('Failed to fetch runs');
    const resp = await response.json();
    setRuns(resp);
  };

  // Mock runs with date added
  const mockRuns = [
    { id: '1', date: '2025-03-22', time: '13m 8s', pace: '5:08 /km', distance: '2.56 km', elevation: '34 m' },
    { id: '2', date: '2025-03-20', time: '16m 7s', pace: '5:00 /km', distance: '3.21 km', elevation: '57 m' },
    { id: '3', date: '2025-03-18', time: '14m 11s', pace: '4:43 /km', distance: '3.00 km', elevation: '37 m' },
    { id: '4', date: '2025-03-15', time: '39m 23s', pace: '5:37 /km', distance: '7.00 km', elevation: '75 m' },
  ];

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
      <FlatList
        style={styles.listContainer}
        ref={flatListRef}
        data={runs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.runCard}>
            <View style={styles.runHeader}>
              <Text style={styles.runDate}>{item.date}</Text>
              <Text style={styles.runTitle}>Run #{item.id}</Text>
            </View>
            <View style={styles.runRow}>
              <Text style={styles.runLabel}>Time:</Text>
              <Text style={styles.runValue}>{item.time}</Text>
            </View>
            <View style={styles.runRow}>
              <Text style={styles.runLabel}>Distance:</Text>
              <Text style={styles.runValue}>{item.distance}</Text>
            </View>
            <View style={styles.runRow}>
              <Text style={styles.runLabel}>Pace:</Text>
              <Text style={styles.runValue}>{item.pace}</Text>
            </View>
            <View style={styles.runRow}>
              <Text style={styles.runLabel}>Elevation:</Text>
              <Text style={styles.runValue}>{item.elevation}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

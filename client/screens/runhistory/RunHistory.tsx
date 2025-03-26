// react native
import { Text, View, FlatList } from 'react-native';
import styles from './styles'
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://192.168.68.100:3000', { transports: ['websocket'] });

export default function RunHistory() {
    const [runs, setRuns] = useState<{ time: string; pace: string; distance: string, elevation: string }[]>([]);
    const flatListRef = useRef<FlatList>(null);

    const getRuns = async () => {
        // adjust as necessary depending on davids routes
        const response = await fetch(`http://192.168.68.100:3000/runs/xXBobmanXx`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        
        const resp = await response.json();
        setRuns(resp);
    }

    useEffect(() => {
        socket.on('stoprun', (run: { time: string; pace: string; distance: string, elevation: string }) => {
            setRuns(prev => [...prev, run]);
        });
        getRuns()
        return () => {
            socket.off('stoprun');
        };
    }, []);

    return (
        <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                          <FlatList
                            style={{ flex: 1 }}
                            ref={flatListRef}
                            data={runs}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View>
                                    <View>{item.time}</View>
                                    <View>{item.pace}</View>
                                    <View>{item.distance}</View>
                                    <View>{item.elevation}</View>
                                </View>
                            )}
                          />
                    </View>
                </View>
        </View>
    );
}
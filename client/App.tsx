import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './screens/homepage/Homepage';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Homepage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
import * as Location from 'expo-location';
import { Runner } from './Types';
import uuid from 'react-native-uuid';

async function post (location: Location.LocationObject) {

  //you have to use your computer local ip to be able to reach the server from your mobile (and your mobile needs to stay in the same wifi ofc)
  const url = "http://192.168.1.192";
  const { latitude, longitude } = location.coords;
  const userId = uuid.v4();
  const runner: Runner = { userId, latitude, longitude }

  try {
    const response = await fetch(url + ':3000/location', {
      method: "post", body: JSON.stringify(runner),
      headers: { "Content-type": "application/json" }
    });
    console.log("the response from server is", response);
  }
  catch (error: any) {
    console.error(error.message);
  }
}

async function getLocation (setCoords: Function, setText: Function): Promise<void> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') setText('Unable to fetch position: permission denied.');
  else Location.getCurrentPositionAsync()
    .then( position => { // todo: type proper
      post(position);
      setCoords([position.coords.longitude, position.coords.latitude]);
      setText(`${position.coords.longitude}, ${position.coords.latitude}`);
    })
    .catch(() => setText('Unable to fetch position: GPS error.')); // todo: use alert?
}

export default { http: { post }, Android: { GPS: { getLocation } }, IOS: {} };
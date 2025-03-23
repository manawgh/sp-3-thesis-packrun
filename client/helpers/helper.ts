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

async function getLocation (setCoords: Function): Promise<void> {
  await Location.requestForegroundPermissionsAsync();
  Location.getCurrentPositionAsync()
    .then( position => {
      post(position); // contains
      setCoords([position.coords.longitude, position.coords.latitude]);
    })
}

export default { http: { post }, Android: { GPS: { getLocation } }, IOS: {} };

// post should call getLoc and not the other way round
// flag triggered by button to check how often we send data and where to
// 
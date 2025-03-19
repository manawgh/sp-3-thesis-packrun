import * as Location from 'expo-location';
import { Runner } from './Types';
import uuid from 'react-native-uuid';

async function post(location: Location.LocationObject) {

  //you have to use your computer local ip to be able to reach the server from your mobile (and your mobile needs to stay in the same wifi ofc)
  const url = "http://192.168.100.18";
  const { latitude, longitude } = location.coords;
  const userId = uuid.v4();
  const runner: Runner = { userId, latitude, longitude }

  try {

    const response = await fetch(url + ':3000/location', {
      method: "post", body: JSON.stringify(runner),
      headers: { "Content-type": "application/json" }
    });
    console.log("the response from server is", response);
  } catch (error: any) {

    console.error(error.message);
  }
}

async function getLocation(setMapText: Function) {

  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') setMapText('Unable to get position. Permission denied.');
  else Location.getCurrentPositionAsync()
    .then(position => {
      post(position);

      setMapText('lat ' + position.coords.latitude + ' , ' + position.coords.longitude + ' long')
        .catch(() => setMapText('Unable to get position. GPS error'))
    });
}


export default { http: { post }, Android: { GPS: { getLocation } }, IOS: {} };
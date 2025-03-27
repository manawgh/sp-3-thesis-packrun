import * as Location from 'expo-location';
import { CustomLocationObject } from './Types';

const url = "http://192.168.68.100";

async function getLocation (): Promise<Location.LocationObject> {
  await Location.requestForegroundPermissionsAsync();
  const locationObject = await Location.getCurrentPositionAsync()
  return locationObject;
};

async function getNearestChatroom () {
  const currentChatLocation: Partial<CustomLocationObject> = await getLocation();
  const userId = 'xXBobmanXx';
  const longitude =  currentChatLocation.coords?.longitude
  const latitude =  currentChatLocation.coords?.latitude
  const locationObj = {
    userId: userId, 
    coords: {longitude: longitude, latitude: latitude}
  }
  try {
    const response = await fetch(url + ':3000/locations', {
      method: "post", body: JSON.stringify(locationObj),
      headers: { "Content-type": "application/json" }
    });
    if (!response.ok) throw new Error('Failed to send location');
    console.log('location update: ', locationObj);
  }
  catch (error: any) {
    console.error(error.message);
  };
};

async function trackCurrentRun ()/* : Promise<GeoJSON.FeatureCollection | undefined> */ {

  try {
    const trackId = await fetch(url + ':3000/tracks/cdwks_vera25',{
      method: "put",
      headers: { "Content-type": "application/json" }
    });

    const runLocation: Partial<CustomLocationObject> = await getLocation();
    runLocation.username = "Bob";
    runLocation.userId = 'cdwks_vera25';

    const parsedTrack = await trackId.json();
    const response = await fetch(url + `:3000/tracks/cdwks_vera25/${parsedTrack.trackId}`, {
      method: "post", body: JSON.stringify(runLocation),
      headers: { "Content-type": "application/json" }
      });

      console.log('EVERY 10 SECONDS', response);
      
    /* if (response.ok) {  
      const geoObject: GeoJSON.FeatureCollection = await response.json()
      console.log('LINE 50', geoObject);
      return geoObject;
    } */
  }
  catch (error: any) {
      console.error(error.message);
  };
};

export default { getLocation, getNearestChatroom, trackCurrentRun };

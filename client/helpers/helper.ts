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
  const locationObj = {
    userId: userId, 
    longitude: currentChatLocation.coords?.longitude ?? 0, 
    latitude: currentChatLocation.coords?.latitude ?? 0,
  }
  try {
    const response = await fetch(url + ':3000/location', {
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

async function trackCurrentRun ()/* : Promise<GeoJSON.FeatureCollection> */ {
  const runLocation: Partial<CustomLocationObject> = await getLocation();
  runLocation.userId = 'xXBobmanXx';
  try {
      const response = await fetch(url + ':3000/tracks', {
          method: "post", body: JSON.stringify(runLocation),
          headers: { "Content-type": "application/json" }
      });
      console.log('EVERY 10 SECONDS', response);
  }
  catch (error: any) {
      console.error(error.message);
  };
};


export default { getLocation, getNearestChatroom, trackCurrentRun };

// flag triggered by button to check how often we send data and where to
// get the converted gps data from the server

//DISPLAY RUN: 
//use maplibre + gps data to display run
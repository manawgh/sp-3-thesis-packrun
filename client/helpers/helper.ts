import * as Location from 'expo-location';
import { Runner } from './Types';
import uuid from 'react-native-uuid';


interface UserProps {
  username: string;
  userId: string;
}

type CustomLocationObject = Location.LocationObject & UserProps;

const url = "http://192.168.1.192";
const { latitude, longitude } = location.coords;
const userId = uuid.v4();
const runner: Runner = { userId, latitude, longitude }

async function getLocation (): Promise<Location.LocationObject> {
  await Location.requestForegroundPermissionsAsync();
  const locationObject = await Location.getCurrentPositionAsync()
  return locationObject;
}

async function post(location: Location.LocationObject) {

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

async function getNearestChatroom(location: Location.LocationObject) {
    const currenChatLocation: CustomLocationObject = getLocation();
    currenChatLocation.username = "Bob"; 
   
    try {
        const response = await fetch(url + ':3000/location', {
            method: "post", body: JSON.stringify(currenChatLocation),
            headers: { "Content-type": "application/json" }
        });
        console.log("the response from server is", response);
    }
    catch (error: any) {
        console.error(error.message);
    }
}
//setInterval(getNearestChatroom, 300000);

async function trackCurrentRun() {
    let currentPostion = getLocation;

    try {
        const response = await fetch(url + ':3000/tracks', {
            method: "post", body: JSON.stringify(currentPostion),
            headers: { "Content-type": "application/json" }
        });
        return response;
    }
    catch (error: any) {
        console.error(error.message);
    }
};


export default { http: { post }, Android: { GPS: { getLocation } }, IOS: {} };

// post should call getLoc and not the other way round
// flag triggered by button to check how often we send data and where to
// 

// TRACK RUN FUNCTION
// getlocation 
// set interval 
// send location to proper endpoint (specific running table)
// get the converted gps data from the server

//DISPLAY RUN: 
//use maplibre + gps data to display run
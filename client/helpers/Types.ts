import * as Location from 'expo-location';

/* export interface Runner {
  userId: string,
  latitude: number,
  longitude: number
} */

export interface UserProps {
  username: string;
  userId: string;
}

export type CustomLocationObject = Location.LocationObject & UserProps;

/* export type LocationObjectCoords = {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
};


export type LocationObj = {
  timestamp: string;
  coords: object;
  userId: string;
  username: string;
} */
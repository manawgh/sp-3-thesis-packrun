import TrackModel from "../models/trackModel";
import { Location } from "../types";

export async function addToTracking(owner: string, trackId: string, location: Location) {
  const trackObject = await TrackModel.findOne({ where: { id: trackId, owner } });
  if (trackObject) {
    trackObject.location = [...trackObject.location, location];
    console.log('locatioooon', trackObject.location);
    await trackObject.save();
    if (trackObject.location.length > 1) {
      const formattedToGeo = await formatToGeoApify(trackObject.location);
      console.log('listo para enviar', JSON.stringify(formattedToGeo));
      const convertToGeo = await convertToGeoApify(formattedToGeo);
      console.log('CONVERSEEEE', convertToGeo);
      return convertToGeo;
    } else return 'not enought waypoints';
  }
}

async function convertToGeoApify(request: any) {
  const URL = 'https://api.geoapify.com/v1/mapmatching?apiKey=195e52b3f3a64bdb903a12bf0fea9ca7';
  const response = await fetch(URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request)
  });
  const body = await response.json();
  return body;
}

async function formatToGeoApify(arrayToConvert: Location[]) {
  const waypoints = arrayToConvert.map(locationObj => {

    if (locationObj.timestamp) return { timestamp: locationObj.timestamp, location: [locationObj.coords.longitude, locationObj.coords.latitude] }
    return { location: [locationObj.coords.longitude, locationObj.coords.latitude] }
  });
  return { mode: "walk", waypoints };
}

export async function createTrack(owner: string) {
  const newTrack = { owner, location: [], converted: {} };
  const isTrackCreated = await TrackModel.create(newTrack);
  return { trackId: isTrackCreated.id };

}

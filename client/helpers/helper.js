import * as Location from 'expo-location';

export default {

  //common functions here


  Android: {//android functions here
    GPS: {
      getLocation: async (setMapText) => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') setMapText('Unable to get position. Permission denied.');

        else Location.getCurrentPositionAsync()
          .then(position => setMapText('lat ' + position.coords.latitude + ' , ' + position.coords.longitude + ' long'))
          .catch(() => setMapText('Unable to get position. GPS error'));
      }
    }
  }
  , IOS: {} //IOS functions here
}
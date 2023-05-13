import Location from '@react-native-community/geolocation';
import * as geolib from 'geolib';

export interface LocationModel {
  latitude: number;
  longitude: number;
}

export let getDistanceResult: LocationModel = {
  latitude: 0,
  longitude: 0,
};

export const getMeters = ({latitude, longitude}: LocationModel) => {
  const cal_Distance = geolib.getPreciseDistance(getDistanceResult, {
    latitude,
    longitude,
  });
  return cal_Distance * 0.000621 * 1609.344;
};

export default function getUserLocation() {
  // Promisify Geolocation.getCurrentPosition since it relies on outdated callbacks
  return new Promise<LocationModel>((resolve, reject) => {
    Location.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        resolve({latitude, longitude});
      },
      error => {
        reject(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 5},
    );
  });
}

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

export const getDistance = Location.getCurrentPosition(
  position => {
    getDistanceResult = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  },
  error => {
    console.log('Unable to get your location!');
  },
  {enableHighAccuracy: true, maximumAge: 1000},
);

export const getMeters = ({latitude, longitude}: LocationModel) => {
  const cal_Distance = geolib.getPreciseDistance(getDistanceResult, {latitude, longitude});
  return cal_Distance * 0.000621 * 1609.344;
};

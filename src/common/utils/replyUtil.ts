import { Feature, WeatherData } from '@infra/api';
import { CELSUS } from '@bot/constants/number.constants';
import { convertDateToString } from './dateUtils';

export const formWeatherReport = (res: WeatherData): string => {
  const celsus = (res.temp - CELSUS).toFixed(2);
  const formattedWeather = ` 
  Погода в ${res.name}, ${convertDateToString(
    new Date()
  )}\nCкорость ветра: ${res.windSpeed.toFixed(
    2
  )} м/c.\nТемпература: ${celsus}
  `;
  return formattedWeather;
};

export const formatRecommendPlace = (places: Feature[]): string => {
  const googleMapURL = 'https://maps.google.com/?q=';
  const formattedPlaces = places.map(place => String.raw`
Название: <b>${place.properties.name}</b>
Cсылка: <a href="${googleMapURL}${place.geometry.coordinates[1]},${place.geometry.coordinates[0]}">Перейти</a>
----------------
`).join('');

  return formattedPlaces;
};

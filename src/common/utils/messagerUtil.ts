import { convertDateToString } from './dateUtils';

export const formWeatherReport = (res: any): string => {
  const CELSUS = 273.15;
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

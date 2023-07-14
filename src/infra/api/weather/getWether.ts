// import { TYPE_API_CONTAINERS } from 'container/api/apiContainer.type';

import { TYPE_API_CONTAINERS } from 'container/api/apiContainer.type';
import { InversifyContainer } from 'container/inversifyContainer';
import { WeatherAPI } from './weatherAPI.config';

export const getWeatherByCity = async (city: string, token: string) => {
  const API = InversifyContainer.get<WeatherAPI>(TYPE_API_CONTAINERS.WeatherAPI);
  // TODO дождаться
  return API.getInstance().get('weather', {
    params: {
      q: city,
      appid: token
    }
  });
};

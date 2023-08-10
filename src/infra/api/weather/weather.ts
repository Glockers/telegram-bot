import { API } from '@infra/api/api.class';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { injectable } from 'inversify';
import { WeatherAPIData } from './weather.type';
import { OPENWEATHER_BASE_URL, OPENWEATHER_WEATHER_URL } from '@config/api.config';

@injectable()
export class WeatherAPI extends API {
  constructor() {
    super();
    this.axiosInstance = axios.create({
      baseURL: OPENWEATHER_BASE_URL
    });
  }

  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  async getWeatherByCity(city: string, token: string): Promise<WeatherAPIData | null> {
    try {
      const result = await this.getInstance().get<WeatherAPIData>(OPENWEATHER_WEATHER_URL, {
        params: {
          q: city,
          appid: token
        }
      });
      return result.data;
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.status === 404) {
        return null;
      } else {
        throw new Error('Failed to fetch weather data.');
      }
    }
  };
}

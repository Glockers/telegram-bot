import { API } from 'infra/api/api.class';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { injectable } from 'inversify';
import { WeatherAPIData } from './weather.type';

@injectable()
export class WeatherAPI extends API {
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/';

  private readonly WEATHER_URL = 'weather';

  constructor() {
    super();
    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL
    });
  }

  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  async getWeatherByCity(city: string, token: string): Promise<WeatherAPIData | null> {
    try {
      const result = await this.getInstance().get<WeatherAPIData>(this.WEATHER_URL, {
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

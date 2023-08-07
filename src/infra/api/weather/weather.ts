import { API } from 'infra/api/api.class';
import axios, { AxiosError } from 'axios';
import { injectable } from 'inversify';

@injectable()
export class WeatherAPI extends API {
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/';

  constructor() {
    super();
    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL
    });
  }

  getInstance() {
    return this.axiosInstance;
  }

  async getWeatherByCity(city: string, token: string) {
    try {
      return await this.getInstance().get('weather', {
        params: {
          q: city,
          appid: token
        }
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 404) {
        return null;
      } else {
        throw new Error('Failed to fetch weather data.');
      }
    }
  };
}

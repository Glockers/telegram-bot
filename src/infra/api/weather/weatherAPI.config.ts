import { API } from 'infra/api/api.class';
import axios from 'axios';
import { injectable } from 'inversify';

@injectable()
export class WeatherAPI extends API {
  private readonly BASE_URL = 'https://api.openweathermap.org';

  constructor() {
    super();
    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL
    });
  }

  getInstance() {
    return this.axiosInstance;
  }
}

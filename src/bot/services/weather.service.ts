import { ConfigService } from '@config/config.service';
import { TYPE_API_CONTAINERS } from 'container/api/apiContainer.type';
import { TYPE_CONFIG_CONTAINERS } from 'container/config/config.type';
import { WeatherAPI } from 'infra/api/weather/weatherAPI.config';
import { inject, injectable } from 'inversify';

export interface IWeatherService {
  // TODO убрать any
  getWeatherByCity: (city: string) => any
}

@injectable()
export class WeatherService implements IWeatherService {
  configService: ConfigService;

  weatherAPI: WeatherAPI;

  constructor(
    @inject(TYPE_CONFIG_CONTAINERS.ConfigService) configService: ConfigService,
    @inject(TYPE_API_CONTAINERS.WeatherAPI) weatherAPI: WeatherAPI
  ) {
    this.configService = configService;
    this.weatherAPI = weatherAPI;
  }

  async getWeatherByCity(city: string) {
    // TODO Вынести статическую инфу
    if (!city) throw new Error('City ​​cannot be empty!');
    const result = await this.weatherAPI.getWeatherByCity(city, this.configService.get('WEATHER_TOKEN'));
    if (!result) return null;
    return this.parseWeather(result.data);
  }

  // TODO убрать any
  private parseWeather(data: any) {
    const { main, weather, wind, name } = data;
    const { temp } = main;
    const { description, main: title } = weather[0];
    const { speed: windSpeed } = wind;

    return { temp, description, windSpeed, name, title };
  }
}

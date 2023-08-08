import { ConfigService } from '@config/config.service';
import { UserError } from '@common/exceptions/userError';
import { TYPE_API_CONTAINERS } from '@container/api/apiContainer.type';
import { TYPE_BOT_CONTAINERS } from '@container/bot/botContainer.type';
import { WeatherAPI } from '@infra/api/weather/weather';
import { WeatherAPIData, WeatherData } from '@infra/api/weather/weather.type';
import { inject, injectable } from 'inversify';

export interface IWeatherService {
  getWeatherByCity: (city: string) => Promise<WeatherData | null>
}

@injectable()
export class WeatherService implements IWeatherService {
  configService: ConfigService;

  weatherAPI: WeatherAPI;

  constructor(
    @inject(TYPE_BOT_CONTAINERS.ConfigService) configService: ConfigService,
    @inject(TYPE_API_CONTAINERS.WeatherAPI) weatherAPI: WeatherAPI
  ) {
    this.configService = configService;
    this.weatherAPI = weatherAPI;
  }

  async getWeatherByCity(city: string): Promise<WeatherData | null> {
    if (!city) throw UserError.sendMessage('Поле для города не может быть пустым!');
    const result = await this.weatherAPI.getWeatherByCity(city, this.configService.get('WEATHER_TOKEN'));
    if (!result) return null;
    return this.parseWeather(result);
  }

  private parseWeather(data: WeatherAPIData): WeatherData {
    const { main, weather, wind, name } = data;
    const { temp } = main;
    const { description, main: title } = weather[0];
    const { speed: windSpeed } = wind;

    return { temp, description, windSpeed, name, title };
  }
}

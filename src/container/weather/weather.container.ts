import { IWeatherController, WeatherController } from 'bot/controllers/weather.contoller';
import { IWeatherService, WeatherService } from 'bot/services/weather.service';
import { IContainer } from 'container/container.type';
import { InversifyContainer } from 'container/inversifyContainer';
import { TYPE_WEATHER_CONTAINERS } from './weather.type';

export class WeatherContainer implements IContainer {
  initContainer() {
    InversifyContainer.bind<IWeatherController>(TYPE_WEATHER_CONTAINERS.WeatherController).to(WeatherController);
    InversifyContainer.bind<IWeatherService>(TYPE_WEATHER_CONTAINERS.WeatherService).to(WeatherService);
  }
}

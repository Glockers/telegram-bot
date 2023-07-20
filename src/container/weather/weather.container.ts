import { IWeatherController, WeatherController } from 'bot/controllers/weather.contoller';
import { IWeatherService, WeatherService } from 'bot/services/weather.service';
import { IContainer, InversifyContainer } from 'container/inversifyContainer';
import { TYPE_WEATHER_CONTAINERS } from './weather.type';
import { ISubscribeController, SubscribeController } from 'bot/controllers/subscribe.controller';
import { ISubscribeService, SubscribeService } from 'bot/services/subscribe.service';

export class WeatherContainer implements IContainer {
  initContainer() {
    InversifyContainer.bind<IWeatherController>(TYPE_WEATHER_CONTAINERS.WeatherController).to(WeatherController);
    InversifyContainer.bind<IWeatherService>(TYPE_WEATHER_CONTAINERS.WeatherService).to(WeatherService);

    InversifyContainer.bind<ISubscribeController>(TYPE_WEATHER_CONTAINERS.SubscribeController).to(SubscribeController);
    InversifyContainer.bind<ISubscribeService>(TYPE_WEATHER_CONTAINERS.SubscribeService).to(SubscribeService);
  }
}

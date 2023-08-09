import { IContainer, InversifyContainer } from '@container/inversifyContainer';
import { TYPE_WEATHER_CONTAINERS } from './weather.type';
import { TYPE_SCENES_CONTAINERS } from '@container/bot/scenes';
import { IWeatherlController, WeatherController } from '@bot/controllers';
import {
  IWeatherService, WeatherService,
  ISubscribeWeatherService, SubscribeWeatherService
} from '@bot/services';
import {
  ISceneBehave, SubscribeOnWeatherScene,
  WeatherScene
} from '@bot/scenes';

export class WeatherContainer implements IContainer {
  initContainer(): void {
    InversifyContainer.bind<IWeatherService>(TYPE_WEATHER_CONTAINERS.WeatherService).to(WeatherService);
    InversifyContainer.bind<ISubscribeWeatherService>(TYPE_WEATHER_CONTAINERS.SubscribeService).to(SubscribeWeatherService);
    InversifyContainer.bind<ISceneBehave>(TYPE_SCENES_CONTAINERS.SubscribeOnWeatherScene).to(SubscribeOnWeatherScene);
    InversifyContainer.bind<ISceneBehave>(TYPE_SCENES_CONTAINERS.WeatherScene).to(WeatherScene);
    InversifyContainer.bind<IWeatherlController>(TYPE_WEATHER_CONTAINERS.WeatherController).to(WeatherController);
  }
}

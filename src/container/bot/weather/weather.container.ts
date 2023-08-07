import { IWeatherService, WeatherService } from 'bot/services/weather.service';
import { IContainer, InversifyContainer } from 'container/inversifyContainer';
import { TYPE_WEATHER_CONTAINERS } from './weather.type';
import { ISubscribeWeatherService, SubscribeWeatherService } from 'bot/services/subscribeWeather.service';
import { ISceneBehave } from 'bot/scenes/scene.type';
import { SubscribeOnWeatherScene } from 'bot/scenes/weather/subscribeWeather.scene';
import { UnsubscribeOnWeatherScene } from 'bot/scenes/weather/unsubscribeWeather.scene';
import { TYPE_SCENES_CONTAINERS } from 'container/bot/scenes/scenes.type';
import { WeatherScene } from 'bot/scenes/weather/weather.scene';
import { IWeatherlController, WeatherController } from 'bot/controllers/weather.controller';

export class WeatherContainer implements IContainer {
  initContainer(): void {
    InversifyContainer.bind<IWeatherService>(TYPE_WEATHER_CONTAINERS.WeatherService).to(WeatherService);
    InversifyContainer.bind<ISubscribeWeatherService>(TYPE_WEATHER_CONTAINERS.SubscribeService).to(SubscribeWeatherService);
    InversifyContainer.bind<ISceneBehave>(TYPE_SCENES_CONTAINERS.SubscribeOnWeatherScene).to(SubscribeOnWeatherScene);
    InversifyContainer.bind<ISceneBehave>(TYPE_SCENES_CONTAINERS.UnsubscribeOnWeatherScene).to(UnsubscribeOnWeatherScene);
    InversifyContainer.bind<ISceneBehave>(TYPE_SCENES_CONTAINERS.WeatherScene).to(WeatherScene);
    InversifyContainer.bind<IWeatherlController>(TYPE_WEATHER_CONTAINERS.WeatherController).to(WeatherController);
  }
}

import { IWeatherService, WeatherService } from 'bot/services/weather.service';
import { IContainer, InversifyContainer } from 'container/inversifyContainer';
import { TYPE_WEATHER_CONTAINERS } from './weather.type';
import { ISubscribeController, SubscribeController } from 'bot/controllers/subscribe.controller';
import { ISubscribeService, SubscribeService } from 'bot/services/subscribe.service';
import { ISceneBehave } from 'bot/scenes/scene.type';
import { SubscribeOnWeatherScene } from 'bot/scenes/weather/subscribeWeather.scene';
import { UnsubscribeOnWeatherScene } from 'bot/scenes/weather/unsubscribeWeather.scene';
import { TYPE_SCENES_CONTAINERS } from 'container/bot/scenes/scenes.type';
import { WeatherScene } from 'bot/scenes/weather/weather.scene';

export class WeatherContainer implements IContainer {
  initContainer() {
    InversifyContainer.bind<IWeatherService>(TYPE_WEATHER_CONTAINERS.WeatherService).to(WeatherService);

    InversifyContainer.bind<ISubscribeController>(TYPE_WEATHER_CONTAINERS.SubscribeController).to(SubscribeController);
    InversifyContainer.bind<ISubscribeService>(TYPE_WEATHER_CONTAINERS.SubscribeService).to(SubscribeService);

    InversifyContainer.bind<ISceneBehave>(TYPE_SCENES_CONTAINERS.SubscribeOnWeatherScene).to(SubscribeOnWeatherScene);
    InversifyContainer.bind<ISceneBehave>(TYPE_SCENES_CONTAINERS.UnsubscribeOnWeatherScene).to(UnsubscribeOnWeatherScene);

    InversifyContainer.bind<ISceneBehave>(TYPE_SCENES_CONTAINERS.WeatherScene).to(WeatherScene);
  }
}

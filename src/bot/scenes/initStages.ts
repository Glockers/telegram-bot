import { Scenes } from 'telegraf';
import { weatherScene } from './weather.scene';
import { subscribeOnWeatherScene } from './subscribeWeather.scene';
import { UnsubscribeOnWeatherScene } from './unsubscribeWeather.scene';

export const stage = new Scenes.Stage<any>(
  [
    weatherScene,
    subscribeOnWeatherScene,
    new UnsubscribeOnWeatherScene().getInstance()
  ],
  {
    ttl: 24 * 60 * 60
  }
);

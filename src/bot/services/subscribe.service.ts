import { IUnsubscribeWeather, ISubscribeWeatherData } from 'bot/scenes/weather/weather.interface';
import { injectable } from 'inversify';

export interface ISubscribeService {
  getSubscriptions: () => void;
  deleteWeather: (data: IUnsubscribeWeather) => void;
  subscibeOnWeather: (data: ISubscribeWeatherData) => void;
}

@injectable()
export class SubscribeService implements ISubscribeService {
  getSubscriptions() { }

  deleteWeather(data: IUnsubscribeWeather) {
    console.log('delete ', data);
  }

  subscibeOnWeather(data: ISubscribeWeatherData) {
    console.log('subscribe ', data);
  }
}

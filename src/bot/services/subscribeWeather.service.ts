import { ISubscribeWeatherData, IUnsubscribeWeather } from 'bot/scenes/weather/weather.interface';
import { TYPE_REPOSITORY_CONTAINERS } from 'container/repository/repository.type';
import { TWeatherSubscribeEntity } from 'infra/database/entities/weatherSubscribe.entity';
import { WeatherSubscribeRepository } from 'infra/database/repository/weatherSubscribe.repository';
import { inject, injectable } from 'inversify';

export interface ISubscribeService {
  getSubscriptions: () => void;
  deleteWeather: (data: IUnsubscribeWeather) => boolean;
  subscibeOnWeather: (data: ISubscribeWeatherData, id: any) => boolean;
}

@injectable()
export class SubscribeWeatherService implements ISubscribeService {
  weatherSubscribeRepository: WeatherSubscribeRepository;

  constructor(
    @inject(TYPE_REPOSITORY_CONTAINERS.WeatherSubscribeRepository) weatherSubscribeRepository: WeatherSubscribeRepository
  ) {
    this.weatherSubscribeRepository = weatherSubscribeRepository;
  }

  async getSubscription(id: number): Promise<TWeatherSubscribeEntity | null> {
    const findedWeather = id ? await this.weatherSubscribeRepository.findOneById(id) : null;
    if (!findedWeather) return null;
    return findedWeather;
  }

  getSubscriptions(): Promise<TWeatherSubscribeEntity[]> {
    return this.weatherSubscribeRepository.getAll();
  }

  deleteWeather(data: IUnsubscribeWeather): boolean {
    console.log('test', !this.getSubscription(data.id));
    if (!this.getSubscription(data.id)) throw new Error('Подписка не найдена');
    return true;
  }

  subscibeOnWeather(data: ISubscribeWeatherData, userID: number): boolean {
    const formedData = {
      ...data,
      userID
    };
    this.weatherSubscribeRepository.add(formedData);
    return true;
  }
}

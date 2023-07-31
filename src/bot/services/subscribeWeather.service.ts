import { ISceneSubscribeWeather, ISceneUnsubscribeWeather } from 'bot/scenes/weather/weather.interface';
import { UserError } from 'common/exceptions/users.error';
import { TYPE_REPOSITORY_CONTAINERS } from 'container/repository/repository.type';
import { TWeatherSubscribeEntity } from 'infra/database/entities/weatherSubscribe.entity';
import { WeatherSubscribeRepository } from 'infra/database/repository/weatherSubscribe.repository';
import { inject, injectable } from 'inversify';

export interface ISubscribeWeatherService {
  deleteWeather: (data: ISceneUnsubscribeWeather) => Promise<boolean>;
  subscibeOnWeather: (data: ISceneSubscribeWeather, id: any) => boolean;
  getWeatherSubscriptions(userID: number): Promise<TWeatherSubscribeEntity[]>
}

@injectable()
export class SubscribeWeatherService implements ISubscribeWeatherService {
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

  async getWeatherSubscriptions(userID: number): Promise<TWeatherSubscribeEntity[]> {
    return await this.weatherSubscribeRepository.findSubscriptionsByUserID(userID);
  }

  async deleteWeather(data: ISceneUnsubscribeWeather): Promise<boolean> {
    const selectedSubscribe = await this.getSubscription(data.id);
    if (!selectedSubscribe) throw UserError.sendMessage('Такой ID не найден');
    this.weatherSubscribeRepository.delete(selectedSubscribe);
    return true;
  }

  subscibeOnWeather(data: ISceneSubscribeWeather, userID: number): boolean {
    const formedData = {
      ...data,
      userID
    };
    this.weatherSubscribeRepository.add(formedData);
    return true;
  }
}

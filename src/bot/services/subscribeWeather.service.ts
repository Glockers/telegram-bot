import { inject, injectable } from 'inversify';
import { SessionSubscribeWeather, SessionUnsubscribeWeather } from '@bot/scenes';
import { UserError } from '@common/exceptions';
import { TYPE_REPOSITORY_CONTAINERS } from '@container/repository';
import { TWeatherSubscribeEntity, WeatherSubscribeRepository } from '@infra/database';

export interface ISubscribeWeatherService {
  deleteWeather: (data: SessionUnsubscribeWeather) => Promise<boolean>;
  subscibeOnWeather: (data: SessionSubscribeWeather, id: number) => boolean;
  getWeatherSubscriptions(userID: number): Promise<TWeatherSubscribeEntity[]>
}

@injectable()
export class SubscribeWeatherService implements ISubscribeWeatherService {
  private readonly weatherSubscribeRepository: WeatherSubscribeRepository;

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

  async deleteWeather(data: SessionUnsubscribeWeather): Promise<boolean> {
    const selectedSubscribe = await this.getSubscription(data.id);
    if (!selectedSubscribe) throw UserError.sendMessage('Такой ID не найден');
    this.weatherSubscribeRepository.delete(selectedSubscribe);
    return true;
  }

  subscibeOnWeather(data: SessionSubscribeWeather, userID: number): boolean {
    const formedData = {
      ...data,
      userID
    };
    this.weatherSubscribeRepository.add(formedData);
    return true;
  }
}

import { Repository } from 'typeorm';
import { TWeatherSubscribeEntity, WeatherSubscribeEntity } from '../entities/weatherSubscribe.entity';
import { injectable } from 'inversify';
import { Database } from '../typeorm';

export type IWeatherSubscribe = Omit<TWeatherSubscribeEntity, 'id'>;

export type TFindSubscribeWeatherById = Pick<TWeatherSubscribeEntity, 'id'>

@injectable()
export class WeatherSubscribeRepository {
  private repository: Repository<TWeatherSubscribeEntity>;

  constructor() {
    this.repository = Database.get().getRepository(WeatherSubscribeEntity);
  }

  async add(data: IWeatherSubscribe): Promise<TWeatherSubscribeEntity> {
    return await this.repository.save(data);
  }

  async delete(data: TWeatherSubscribeEntity): Promise<TWeatherSubscribeEntity> {
    return await this.repository.remove(data);
  }

  async getAllByTime(targetTime: Date): Promise<TWeatherSubscribeEntity[]> {
    const targetHours = targetTime.getHours();
    const targetMinutes = targetTime.getMinutes();
    const records = await this.repository
      .createQueryBuilder('record')
      .where('EXTRACT(HOUR FROM record.time) = :hours', { hours: targetHours })
      .andWhere('EXTRACT(MINUTE FROM record.time) = :minutes', { minutes: targetMinutes })
      .getMany();
    return records;
  }

  async findOneById(id: number): Promise<TWeatherSubscribeEntity | null> {
    return await this.repository.findOneBy({
      id
    });
  }
}

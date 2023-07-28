import { IConfigService } from '@config/config.service';
import { InversifyContainer } from 'container/inversifyContainer';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { WeatherSubscribeEntity } from './entities/weatherSubscribe.entity';
import { TYPE_BOT_CONTAINERS } from 'container/bot/botContainer.type';
import { TaskSubscribeEntity } from './entities/taskSubscribe.entity';

// TOD вынести конфигурацию
export class Database {
  private static instance: DataSource | null = null;

  public static get(): DataSource {
    if (!Database.instance) {
      Database.instance = Database.createDataSource();
    }

    return Database.instance;
  }

  private static createDataSource(): DataSource {
    const configService = InversifyContainer.get<IConfigService>(TYPE_BOT_CONTAINERS.ConfigService);
    const options: DataSourceOptions = {
      type: configService.get('TYPEORM_CONNECTION') as 'postgres',
      host: configService.get('TYPEORM_HOST'),
      port: Number(configService.get('TYPEORM_PORT')),
      username: configService.get('TYPEORM_USERNAME'),
      password: configService.get('TYPEORM_PASSWORD'),
      database: configService.get('TYPEORM_DATABASE'),
      synchronize: Boolean(configService.get('TYPEORM_SYNCHRONIZE')),
      entities: [TaskEntity, WeatherSubscribeEntity, TaskSubscribeEntity],
      migrations: []
    };

    return new DataSource(options);
  }
}

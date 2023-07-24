import { IConfigService } from '@config/config.service';
import { InversifyContainer } from 'container/inversifyContainer';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { WeatherSubscribeEntity } from './entities/weatherSubscribe.entity';
import { TYPE_CONFIG_CONTAINERS } from 'container/config/config.type';

// eslint-disable-next-line no-undef
const configService = InversifyContainer.get<IConfigService>(TYPE_CONFIG_CONTAINERS.ConfigService);

// TOD вынести конфигурацию
const options: DataSourceOptions = {
  type: configService.get('TYPEORM_CONNECTION') as any,
  host: configService.get('TYPEORM_HOST'),
  port: Number(configService.get('TYPEORM_PORT')),
  username: configService.get('TYPEORM_USERNAME'),
  password: configService.get('TYPEORM_PASSWORD'),
  database: configService.get('TYPEORM_DATABASE'),
  synchronize: Boolean(configService.get('TYPEORM_SYNCHRONIZE')),
  entities: [TaskEntity, WeatherSubscribeEntity],
  migrations: []
};

export const postgresDataSource = new DataSource(options);

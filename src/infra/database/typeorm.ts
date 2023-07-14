import { IConfigService } from '@config/config.service';
import { TYPE_BOT_CONTAINERS } from 'container/bot/botContainer.type';
import { InversifyContainer } from 'container/inversifyContainer';
import { DataSource, DataSourceOptions } from 'typeorm';

const configService = InversifyContainer.get<IConfigService>(TYPE_BOT_CONTAINERS.ConfigService);

// TOD вынести конфигурацию
const options: DataSourceOptions = {
  type: configService.get('TYPEORM_CONNECTION') as any,
  host: configService.get('TYPEORM_HOST'),
  port: Number(configService.get('TYPEORM_PORT')),
  username: configService.get('TYPEORM_USERNAME'),
  password: configService.get('TYPEORM_PASSWORD'),
  database: configService.get('TYPEORM_DATABASE'),
  synchronize: Boolean(configService.get('TYPEORM_SYNCHRONIZE')),
  entities: [],
  migrations: []
  // migrationsTableName: appConfig.APP_NODE_ENV === 'production' ? undefined : typeormConfig.migrationsTableName,
  // factories: appConfig.APP_NODE_ENV === 'production' ? [] : typeormConfig.factories,
  // seeds: appConfig.APP_NODE_ENV === 'production' ? [] : typeormConfig.seeds
};

// const options: DataSourceOptions & SeederOptions = {
//   type: typeormConfig.TYPEORM_CONNECTION,
//   host: typeormConfig.TYPEORM_HOST,
//   port: typeormConfig.TYPEORM_PORT,
//   username: typeormConfig.TYPEORM_USERNAME,
//   password: typeormConfig.TYPEORM_PASSWORD,
//   database: typeormConfig.TYPEORM_DATABASE,
//   logging: typeormConfig.TYPEORM_LOGGING,
//   synchronize: typeormConfig.TYPEORM_SYNCHRONIZE,
//   entities: appConfig.APP_NODE_ENV === 'production' ? typeormConfig.productionEntityPath : typeormConfig.developEntityPath,
//   migrations: appConfig.APP_NODE_ENV === 'production' ? [] : typeormConfig.migrationsPath,
//   migrationsTableName: appConfig.APP_NODE_ENV === 'production' ? undefined : typeormConfig.migrationsTableName,
//   factories: appConfig.APP_NODE_ENV === 'production' ? [] : typeormConfig.factories,
//   seeds: appConfig.APP_NODE_ENV === 'production' ? [] : typeormConfig.seeds
// };

export const PostgresDataSource = new DataSource(options);

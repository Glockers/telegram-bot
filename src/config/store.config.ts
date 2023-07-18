import { Postgres } from '@telegraf/session/pg';
import { IConfigService } from './config.service';

export const getPgSession = (config: IConfigService) => {
  return Postgres<any>({
    host: config.get('TYPEORM_HOST'),
    database: config.get('TYPEORM_DATABASE'),
    user: config.get('TYPEORM_USERNAME'),
    password: config.get('TYPEORM_PASSWORD')
  });
};

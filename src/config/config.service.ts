import { IConfigService } from './config.interface';

export class ConfigService implements IConfigService {
  get(key: string): string {
    throw new Error('Method not implemented.');
  }
}

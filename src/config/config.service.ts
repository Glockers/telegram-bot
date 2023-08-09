import { injectable } from 'inversify';
import 'dotenv/config';

export interface IConfigService {
  get(key: string): string;
}

@injectable()
export class ConfigService implements IConfigService {
  get(key: string): string {
    const value = process.env[key];
    if (value === undefined) {
      throw new Error(`Переменная окружения: ${key} не найдена`);
    }
    return value;
  }
}

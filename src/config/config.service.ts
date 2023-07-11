import { DotenvParseOutput, config } from 'dotenv';
import { IConfigService } from './config.interface';

export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor() {
    const { error, parsed } = config();
    if (error) throw new Error('Не найден file dotend');
    if (!parsed) throw new Error('Пусто .env file');

    this.config = parsed;
  }

  get(key: string): string {
    const findedKey = this.config[key];
    if (!findedKey) throw new Error(`Ключ: ${key} не найден`);
    return findedKey;
  }
}

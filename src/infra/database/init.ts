import { Logger } from '@common/utils';
import { Database } from './typeorm';

export function initDatabase(): void {
  try {
    Database.get().initialize();
    Logger.getLogger().info('Connection has been established successfully.');
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }
}

import { Logger } from 'common/utils/logger';
import { Database } from './typeorm';

export function initDatabase() {
  try {
    Database.get().initialize();
    Logger.getLogger().info('Connection has been established successfully.');
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }
}

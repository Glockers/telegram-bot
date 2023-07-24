import { Logger } from 'utils/logger';
import { postgresDataSource } from './typeorm';

export function initDatabase() {
  try {
    postgresDataSource.initialize();
    Logger.getLogger().info('Connection has been established successfully.');
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }
}

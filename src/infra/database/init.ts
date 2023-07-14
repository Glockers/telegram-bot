import { PostgresDataSource } from './typeorm';

export function initDatabase() {
  try {
    PostgresDataSource.initialize();
    // logger.info('Connection has been established successfully.');
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }
}

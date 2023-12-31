import 'reflect-metadata';
import { IBot } from '@bot/bot';
import { InversifyContainer } from '@container/inversifyContainer';
import { Logger } from '@common/utils';
import { TYPE_BOT_CONTAINERS } from '@container/bot';
import { initDatabase } from '@infra/database';

const bot = InversifyContainer.get<IBot>(TYPE_BOT_CONTAINERS.Bot);

try {
  initDatabase();
  bot.init();
  Logger.getLogger().info('Телеграм бот запущен');
} catch {
  Logger.getLogger().error('Бот не смог запустится');
}

process.once('SIGINT', (err: Error) => {
  bot.stop('SIGINT');
  Logger.getLogger().error(err.stack);
});

process.once('SIGTERM', () => {
  bot.stop('SIGTERM');
  Logger.getLogger().error('SIGTERM RECEIVED. Shutting down gracefully...');
});

process.once('unhandledRejection', (err: Error) => {
  Logger.getLogger().error(
    { name: err.name, message: err.message, stackTrace: err.stack },
    'UNHANDLED REJECTION! 💥 Shutting down...'
  );
});

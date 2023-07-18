import 'reflect-metadata';
import { IBot } from 'bot/bot';
import { InversifyContainer } from 'container/inversifyContainer';
import { Logger } from 'utils/logger';
import { TYPE_BOT_CONTAINERS } from 'container/bot/botContainer.type';
import { initDatabase } from 'infra/database/init';

const bot = InversifyContainer.get<IBot>(TYPE_BOT_CONTAINERS.Bot);

try {
  initDatabase();
  bot.init();
  Logger.getLogger().info('Телеграм бот запущен');
} catch {
  Logger.getLogger().error('Бот не смог запустится');
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
process.once('unhandledRejection', (err: Error) => {
  Logger.getLogger().error(err.stack);
  // bot.stop('unhandledRejection');
});

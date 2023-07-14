import 'reflect-metadata';
import { IBot } from 'bot/bot';
import { InversifyContainer } from 'container/inversifyContainer';
import { Logger } from 'utils/logger';
import { TYPE_BOT_CONTAINERS } from 'container/bot/botContainer.type';

const bot = InversifyContainer.get<IBot>(TYPE_BOT_CONTAINERS.Bot);

try {
  bot.init();
  Logger.getLogger().info('Телеграм бот запущен');
} catch (err) {
  Logger.getLogger().error('Ошибка при запуске: ', err);
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

import 'reflect-metadata';
import { IBot } from 'bot';
import { TYPE_CONTAINERS } from 'container/typeContainers';
import { InversifyContainer } from 'container/inversifyContainer';
import { Logger } from 'utils/logger';

const bot = InversifyContainer.get<IBot>(TYPE_CONTAINERS.Bot);

try {
  bot.init();
  Logger.getLogger().info('Телеграм бот запущен');
} catch (err) {
  Logger.getLogger().error('Ошибка при запуске: ', err);
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

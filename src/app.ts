import 'reflect-metadata';
import { IBot } from 'bot';
import { TYPES } from 'container/typeContainers';
import { InversifyContainer as inversifyContainer } from 'container/inversifyContainer';
import { Logger } from 'utils/logger';

const bot = inversifyContainer.get<IBot>(TYPES.Bot);

try {
  bot.init();
  Logger.getLogger().info('Телеграм бот успешно запущен');
} catch (err) {
  Logger.getLogger().error('Ошибка при запуске: ', err);
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

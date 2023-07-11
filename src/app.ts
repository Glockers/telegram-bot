import 'reflect-metadata';
import { IBot } from 'bot/bot';
import { TYPES } from 'container/types';
import { myContainer } from 'container/inversify.config';

const bot = myContainer.get<IBot>(TYPES.Bot);

bot.init();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

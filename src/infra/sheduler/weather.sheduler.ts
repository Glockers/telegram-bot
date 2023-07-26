import { IBotContext } from 'bot/context/context.interface';
import { Telegraf } from 'telegraf';

export const weatherShedulerHandler = (bot: Telegraf<IBotContext>) => {
  bot.telegram.sendMessage('760175592', 'weatherShedulerHandler');
};

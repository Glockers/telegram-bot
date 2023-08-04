import { IBotContext } from 'bot/interfaces/context.interface';

// TODO вынести конфиг
export const ratelimitConfig = {
  window: 3000,
  limit: 1,
  onLimitExceeded: (ctx: IBotContext) => ctx.reply('Rate limit exceeded')
};

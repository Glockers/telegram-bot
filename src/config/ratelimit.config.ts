import { DONT_RUSH_MESSAGE } from '@bot/constants';
import { IBotContext } from '@bot/interfaces';

export const ratelimitConfig = {
  window: 3000,
  limit: 1,
  onLimitExceeded: (ctx: IBotContext) => ctx.reply(DONT_RUSH_MESSAGE)
};

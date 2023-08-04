import { IBotContext } from 'bot/interfaces/context.interface';
import { UserError } from 'common/exceptions/users.error';
import { Logger } from '../utils/logger';

export async function catchAsyncFunction(ctx: IBotContext, asyncFunction: Function) {
  try {
    return await asyncFunction(ctx);
  } catch (error) {
    if (error instanceof UserError) {
      ctx.reply(error.message);
    } else {
      Logger.getLogger().error(error);
      ctx.reply('Что-то пошло не так!');
    }
    return ctx.scene.leave();
  }
}

import { IBotContext } from '@bot/interfaces';
import { UserError } from '@common/exceptions';
import { Logger } from '@common/utils';

export async function catchAsyncFunction(ctx: IBotContext, asyncFunction: Function): Promise<unknown> {
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

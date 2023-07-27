import { IBotContext } from 'bot/context/context.interface';

export async function catchAsyncFunction(ctx: IBotContext, asyncFunction: Function) {
  try {
    return await asyncFunction(ctx);
  } catch (error) {
    if (error instanceof Error) {
      ctx.reply(error.message);
    }
    return ctx.scene.leave();
  }
}

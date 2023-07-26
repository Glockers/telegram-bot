import { IBotContext } from 'bot/context/context.interface';

export function catchAsyncFunction(ctx: IBotContext, asyncFunction: Function) {
  try {
    return asyncFunction(ctx);
  } catch (error) {
    if (error instanceof Error) {
      ctx.reply(error.message);
    }
    return ctx.scene.leave();
  }
}

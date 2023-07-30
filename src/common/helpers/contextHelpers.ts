import { IBotContext } from 'bot/context/context.interface';
import { Message } from 'telegraf/typings/core/types/typegram';

// TODO add null
export function extractMessageFromChat(ctx: IBotContext): string {
  if (ctx?.message) {
    return (ctx.message as Message.TextMessage).text;
  } else {
    return (ctx.message as any).text;
  }
}

export function exctractUserIdFromChat(ctx: IBotContext): number {
  const userID = ctx.message?.from.id;
  if (!userID) throw new Error('Ошибка, id у пользователя должен существовать');
  return userID;
}

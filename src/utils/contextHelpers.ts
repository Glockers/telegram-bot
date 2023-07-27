import { IBotContext } from 'bot/context/context.interface';
import { Message } from 'telegraf/typings/core/types/typegram';

export function extractMessageFromChat(ctx: IBotContext): string {
  return (ctx.message as Message.TextMessage).text;
}

export function exctractUserIdFromChat(ctx: IBotContext): number {
  const userID = ctx.message?.from.id;
  if (!userID) throw new Error('Ошибка, id у пользователя должен существовать');
  return userID;
}

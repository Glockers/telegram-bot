import { Message } from 'telegraf/typings/core/types/typegram';
import { AppUpdate, CallbackQueryData, IBotContext } from '@bot/interfaces';

export function extractMessageFromChat(ctx: IBotContext): string {
  return (ctx.message as Message.TextMessage).text;
}

export function exctractUserIdFromChat(ctx: IBotContext): number {
  const userID = ctx?.message ? ctx?.message?.from.id : (ctx.update as AppUpdate)?.callback_query?.from.id;
  if (!userID) throw new Error('Ошибка, id у пользователя должен существовать');
  return userID;
}

export function exctractcallbackQueryData(ctx: CallbackQueryData) {
  try {
    return JSON.parse(ctx.match[1]) as { id: number };
  } catch (error) {
    throw new Error('Ошибка при десериализации данных');
  }
}

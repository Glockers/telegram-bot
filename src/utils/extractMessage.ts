import { IBotContext } from 'bot/context/context.interface';
import { Message } from 'telegraf/typings/core/types/typegram';

// TODO переписать без as
export function extractMessageFromChat(ctx: IBotContext): string {
  return (ctx.message as Message.TextMessage).text;
}

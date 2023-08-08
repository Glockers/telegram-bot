import { Telegraf } from 'telegraf';
import { TYPE_BOT_CONTAINERS } from '@container/bot/botContainer.type';
import { IBot } from '@bot/bot';
import { IBotContext, CommandHandlers } from '@bot/interfaces';
import { InversifyContainer } from '@container/inversifyContainer';

export abstract class AbstactCommand {
  protected readonly bot: Telegraf<IBotContext>;

  constructor() {
    this.bot = InversifyContainer.get<IBot>(TYPE_BOT_CONTAINERS.Bot).getInstance();
  }

  abstract initCommands(): void

  abstract getCommands(): CommandHandlers;
}

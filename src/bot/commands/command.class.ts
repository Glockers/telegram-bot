import { TYPE_BOT_CONTAINERS } from './../../container/bot/botContainer.type';
import { IBot } from 'bot/bot';
import { IBotContext } from 'bot/context/context.interface';
import { CommandHandlers } from 'bot/interfaces/command.interface';
import { InversifyContainer } from 'container/inversifyContainer';
import { Telegraf } from 'telegraf';

export abstract class AbstactCommand {
  protected bot: Telegraf<IBotContext>;

  constructor() {
    this.bot = InversifyContainer.get<IBot>(TYPE_BOT_CONTAINERS.Bot).getInstance();
  }

  abstract initCommands(): void

  abstract getCommands(): CommandHandlers;
}

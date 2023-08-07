import { Telegraf } from 'telegraf';
import { IBotContext } from './context.interface';
import { InversifyContainer } from 'container/inversifyContainer';
import { IBot } from 'bot/bot';
import { TYPE_BOT_CONTAINERS } from 'container/bot/botContainer.type';

export abstract class AbstactAction {
  protected readonly bot: Telegraf<IBotContext>;

  constructor() {
    this.bot = InversifyContainer.get<IBot>(TYPE_BOT_CONTAINERS.Bot).getInstance();
  }

  abstract init(): void
}

import { TYPE_BOT_CONTAINERS } from './../../container/bot/botContainer.type';
import { IBot } from 'bot/bot';
import { InversifyContainer } from 'container/inversifyContainer';
import { Telegraf } from 'telegraf';

// TODO добавить типизацию
export abstract class AbstactCommand {
  // eslint-disable-next-line no-useless-constructor
  protected bot: Telegraf;

  constructor() {
    this.bot = InversifyContainer.get<IBot>(TYPE_BOT_CONTAINERS.Bot).getInstance();
  }

  abstract handle(): void
}

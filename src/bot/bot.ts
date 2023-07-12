import { getInstanceCommands } from '@commands/commands';
import { ConfigService } from '@config/config.service';
import { TYPES } from 'container/types';
import { inject, injectable } from 'inversify';
import { Telegraf } from 'telegraf';

export interface IBot {
  init: () => void,
  stop: (error: string) => void
}

@injectable()
export class Bot implements IBot {
  bot: Telegraf; // TODO добавить типизацию

  constructor(@inject(TYPES.ConfigService) configService: ConfigService) {
    this.bot = new Telegraf(configService.get('TOKEN')); // TODO Вынести TOKEN  /  добавить типизацию
  }

  public init() {
    this.initCommands();
    this.bot.launch();
    this.handleError();
  }

  public stop(error: string) {
    this.bot.stop(error);
  };

  private initCommands() {
    const commands = getInstanceCommands(this.bot);
    for (const command of commands) {
      command.handle();
    }
  }

  // TODO изменить
  private handleError() {
    this.bot.catch((error, ctx) => {
      console.error('Произошла ошибка:', error);
      ctx.reply('Произошла ошибка. Пожалуйста, попробуйте еще раз позже.');
    });
  }
}

import { getInstanceCommands } from '@commands/commands';
import { ConfigService } from '@config/config.service';
import { TYPE_CONTAINERS } from 'container/typeContainers';
import { inject, injectable } from 'inversify';
import { Telegraf } from 'telegraf';
import { Logger } from 'utils/logger';

export interface IBot {
  init: () => void,
  stop: (error: string) => void
}

@injectable()
export class Bot implements IBot {
  bot: Telegraf; // TODO добавить типизацию

  constructor(@inject(TYPE_CONTAINERS.ConfigService) configService: ConfigService) {
    this.bot = new Telegraf(configService.get('TOKEN')); // TODO Вынести TOKEN  /  добавить типизацию
  }

  public init(): void {
    this.initCommands();
    this.bot.launch();
    this.handleError();
  }

  public stop(error: string): void {
    this.bot.stop(error);
    Logger.getLogger().info('Бот оставновлен');
  };

  private initCommands(): void {
    const commands = getInstanceCommands(this.bot);
    for (const command of commands) {
      command.handle();
    }
  }

  private handleError(): void {
    this.bot.catch((error, ctx) => {
      if (error instanceof Error) {
        Logger.getLogger().error({
          messageError: error,
          stackTrace: error.stack
        });
      } else {
        Logger.getLogger().error({
          messageError: error
        });
      }

      if (ctx) {
        ctx.reply('Произошла ошибка. Пожалуйста, попробуйте еще раз позже.'); // TOD вынести в константу
      }
    });
  }
}

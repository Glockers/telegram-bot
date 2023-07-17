import { ICommand } from 'bot/commands/commands';
import { ConfigService } from '@config/config.service';
import { inject, injectable } from 'inversify';
import { Telegraf } from 'telegraf';
import { Logger } from 'utils/logger';
import { TYPE_BOT_CONTAINERS } from 'container/bot/botContainer.type';
import { TYPE_COMMAND_CONTAINERS } from 'container/commands/command.type';
import { AbstactCommand } from './commands/command.class';
import { InversifyContainer } from 'container/inversifyContainer';

export interface IBot {
  init: () => void;
  stop: (error: string) => void;
  getInstance: () => Telegraf;
}

@injectable()
export class Bot implements IBot {
  bot: Telegraf; // TODO добавить типизацию

  commands: AbstactCommand[];

  constructor(
    @inject(TYPE_BOT_CONTAINERS.ConfigService) configService: ConfigService
  ) {
    this.bot = new Telegraf(configService.get('TOKEN')); // TODO Вынести TOKEN  /  добавить типизацию
    this.commands = [];
  }

  getInstance(): Telegraf {
    return this.bot;
  }

  handleError2(asyncFunction: Function): void {
    asyncFunction();
  }

  public init() {
    try {
      this.handleError();
      this.initCommands();
      this.bot.launch();
    } catch (error) {
      const errorText = 'Ошибка при создании бота: ' + error;
      Logger.getLogger().error(errorText);
      throw errorText;
    }
  };

  public stop(error: string): void {
    this.bot.stop(error);
    Logger.getLogger().info('Бот оставновлен');
  };

  private initCommands(): void {
    this.commands = InversifyContainer.get<ICommand>(TYPE_COMMAND_CONTAINERS.Command).getInstanceCommands();
    for (const command of this.commands) {
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

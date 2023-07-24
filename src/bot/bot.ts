import { ConfigService } from '@config/config.service';
import { inject, injectable } from 'inversify';
import { Telegraf, session } from 'telegraf';
import { Logger } from 'utils/logger';
import { TYPE_COMMAND_CONTAINERS } from 'container/bot/commands/command.type';
import { AbstactCommand } from './commands/command.class';
import { InversifyContainer } from 'container/inversifyContainer';
import { IBotContext } from './context/context.interface';
import { Stage } from './scenes/initStages';
// @ts-ignore
import rateLimit from 'telegraf-ratelimit';
import { ratelimitConfig } from '@config/ratelimit.config';
import { TYPE_CONFIG_CONTAINERS } from 'container/config/config.type';

export interface IBot {
  init: () => void;
  stop: (error: string) => void;
  getInstance: () => Telegraf<IBotContext>;
}

@injectable()
export class Bot implements IBot {
  bot: Telegraf<IBotContext>; // TODO добавить типизацию

  constructor(
    @inject(TYPE_CONFIG_CONTAINERS.ConfigService) configService: ConfigService
  ) {
    this.bot = new Telegraf<IBotContext>(configService.get('TOKEN')); // TODO Вынести TOKEN  /  добавить типизацию
    // this.pgSession = getPgSession(configService);
  }

  getInstance(): Telegraf<IBotContext> {
    return this.bot;
  }

  public init() {
    try {
      this.initMiddlewares();
      this.handleError();
      this.initCommands();
      this.bot.launch();
    } catch (error) {
      const errorText = 'Ошибка при создании бота: ' + error;
      Logger.getLogger().error(errorText);
      throw errorText;
    }
  }

  public stop(error: string): void {
    this.bot.stop(error);
    Logger.getLogger().info('Бот оставновлен');
  }

  private initCommands(): void {
    Object.keys(TYPE_COMMAND_CONTAINERS).forEach((key) => {
      const command =
        TYPE_COMMAND_CONTAINERS[key as keyof typeof TYPE_COMMAND_CONTAINERS];
      InversifyContainer.get<AbstactCommand>(command).handle();
    });
  }

  private initMiddlewares() {
    this.bot.use(session());
    this.bot.use(new Stage().getInstance().middleware());
    this.bot.use(rateLimit(ratelimitConfig));
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

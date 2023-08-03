import { ConfigService } from '@config/config.service';
import { inject, injectable } from 'inversify';
import { Telegraf, session } from 'telegraf';
import { Logger } from 'common/utils/logger';
import { TYPE_COMMAND_CONTAINERS } from 'container/bot/commands/command.type';
import { AbstactCommand } from './interfaces/command.class';
import { InversifyContainer } from 'container/inversifyContainer';
import { IBotContext } from './interfaces/context.interface';
import { Stage } from './scenes/initStages';
// import { ratelimitConfig } from '@config/ratelimit.config';
import { TYPE_BOT_CONTAINERS } from 'container/bot/botContainer.type';
import { initSheduler } from 'infra/sheduler/sheduler.service';
import { TYPE_ACTION_CONTAINERS } from 'container/bot/actions/actions.type';
import { AbstactAction } from './interfaces/actions.class';
// @ts-ignore
// import rateLimit from 'telegraf-ratelimit';

export interface IBot {
  init: () => void;
  stop: (error: string) => void;
  getInstance: () => Telegraf<IBotContext>;
}

@injectable()
export class Bot implements IBot {
  bot: Telegraf<IBotContext>;

  constructor(
    @inject(TYPE_BOT_CONTAINERS.ConfigService) configService: ConfigService
  ) {
    this.bot = new Telegraf<IBotContext>(configService.get('TOKEN'));
  }

  getInstance(): Telegraf<IBotContext> {
    return this.bot;
  }

  public init() {
    try {
      initSheduler(this.bot);
      this.initMiddlewares();
      this.initCommands();
      this.initActions();
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
      InversifyContainer.get<AbstactCommand>(command).initCommands();
    });
  }

  private initActions(): void {
    Object.keys(TYPE_ACTION_CONTAINERS).forEach((key) => {
      const command =
        TYPE_ACTION_CONTAINERS[key as keyof typeof TYPE_ACTION_CONTAINERS];
      InversifyContainer.get<AbstactAction>(command).init();
    });
  }

  private initMiddlewares() {
    this.bot.use(session());
    this.bot.use(new Stage().getInstance().middleware());
    // this.bot.use(rateLimit(ratelimitConfig));
    this.handleError();
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

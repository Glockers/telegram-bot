import { injectable } from 'inversify';
import { AbstactCommand } from '../interfaces/command.class';
import { CommandName } from 'bot/constants/command.enum';
import { AppScenes } from 'bot/constants/scenes.enum';
import { CommandHandlers } from 'bot/interfaces/command.interface';
import { IBotContext } from 'bot/interfaces/context.interface';
import { catchAsyncFunction } from 'common/helpers/catchAsync';

@injectable()
export class SubscribeCommand extends AbstactCommand {
  initCommands(): void {
    this.bot.command(CommandName.SUBSCRIBE, (ctx) =>
      this.getCommands()[CommandName.SUBSCRIBE]!(ctx)
    );

    this.bot.command(CommandName.UNSUBSCRIBE, (ctx) =>
      this.getCommands()[CommandName.UNSUBSCRIBE]!(ctx)
    );
  }

  getCommands(): CommandHandlers {
    const commandHandlers: CommandHandlers = {
      [CommandName.SUBSCRIBE]: this.subscribeOnWeather,
      [CommandName.UNSUBSCRIBE]: this.unsubscribeFromWeather
    };
    return commandHandlers;
  }

  private subscribeOnWeather(ctx: IBotContext): void {
    catchAsyncFunction(ctx, () => ctx.scene.enter(AppScenes.SUBSCRIBE_ON_WEATHER));
  }

  private unsubscribeFromWeather(ctx: IBotContext): void {
    catchAsyncFunction(ctx, () => ctx.scene.enter(AppScenes.UNSUBSCRIBE_FROM_WEATHER));
  }
}

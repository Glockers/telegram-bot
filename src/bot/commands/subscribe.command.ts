import { injectable } from 'inversify';
import { CommandName, AppScenes } from '@bot/constants';
import { AbstactCommand, CommandHandlers, IBotContext } from '@bot/interfaces';
import { catchAsyncFunction } from '@common/helpers';

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
      [CommandName.SUBSCRIBE]: this.subscribeOnWeather
    };
    return commandHandlers;
  }

  private subscribeOnWeather(ctx: IBotContext): void {
    catchAsyncFunction(ctx, () => ctx.scene.enter(AppScenes.SUBSCRIBE_ON_WEATHER));
  }
}

import { injectable } from 'inversify';
import { CommandName, AppScenes } from '@bot/constants';
import { CommandHandlers, IBotContext, AbstactCommand } from '@bot/interfaces';

@injectable()
export class WeatherCommand extends AbstactCommand {
  initCommands(): void {
    this.bot.command(CommandName.WEATHER, (ctx) =>
      this.getCommands()[CommandName.WEATHER]!(ctx)
    );
  }

  getCommands(): CommandHandlers {
    const commandHandlers: CommandHandlers = {
      [CommandName.WEATHER]: this.weatherHandler
    };
    return commandHandlers;
  }

  private weatherHandler(ctx: IBotContext): void {
    ctx.scene.enter(AppScenes.WEATHER);
  }
}

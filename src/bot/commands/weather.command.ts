import { injectable } from 'inversify';
import { AbstactCommand } from '../interfaces/command.class';
import { CommandName } from 'bot/constants/command.enum';
import { AppScenes } from 'bot/constants/scenes.enum';
import { CommandHandlers } from 'bot/interfaces/command.interface';
import { IBotContext } from 'bot/interfaces/context.interface';

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

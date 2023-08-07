import { injectable } from 'inversify';
import { AbstactCommand } from '../interfaces/command.class';
import { COMMAND_NAME } from 'bot/constants/command.enum';
import { SCENE } from 'bot/constants/scenes.enum';
import { CommandHandlers } from 'bot/interfaces/command.interface';
import { IBotContext } from 'bot/interfaces/context.interface';

@injectable()
export class WeatherCommand extends AbstactCommand {
  initCommands(): void {
    this.bot.command(COMMAND_NAME.WEATHER, (ctx) =>
      this.getCommands()[COMMAND_NAME.WEATHER]!(ctx)
    );
  }

  getCommands(): CommandHandlers {
    const commandHandlers: CommandHandlers = {
      [COMMAND_NAME.WEATHER]: this.weatherHandler
    };
    return commandHandlers;
  }

  private weatherHandler(ctx: IBotContext): void {
    ctx.scene.enter(SCENE.WEATHER);
  }
}

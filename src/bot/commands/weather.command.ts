import { injectable } from 'inversify';
import { AbstactCommand } from './command.class';
import { COMMAND_NAME } from 'bot/constants/command.enum';
import { SCENE } from 'bot/constants/scenes.enum';
import { CommandHandlers } from 'bot/interfaces/command.interface';
import { IBotContext } from 'bot/context/context.interface';

@injectable()
export class WeatherCommand extends AbstactCommand {
  // eslint-disable-next-line no-useless-constructor
  constructor(
  ) {
    super();
  }

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

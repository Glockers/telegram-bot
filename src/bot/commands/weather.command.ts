import { injectable } from 'inversify';
import { AbstactCommand } from './command.class';
import { COMMAND } from 'bot/constants/command.enum';
import { SCENE } from 'bot/constants/scenes.enum';

@injectable()
export class WeatherCommand extends AbstactCommand {
  // eslint-disable-next-line no-useless-constructor
  constructor(
  ) {
    super();
  }

  handle(): void {
    this.weatherHandler();
  }

  // TODO типизировать
  weatherHandler(): void {
    this.bot.command(COMMAND.WEATHER, (ctx) =>
      ctx.scene.enter(SCENE.WEATHER)
    );
  }
}

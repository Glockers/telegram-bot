import { inject, injectable } from 'inversify';
import { AbstactCommand } from './command.class';
import { COMMAND } from 'bot/constants/command.enum';
import { TYPE_SCENES_CONTAINERS } from 'container/scenes/scenes.type';
import { WeatherScene } from 'bot/scenes/weather/weather.scene';
import { SCENE } from 'bot/constants/scenes.enum';

@injectable()
export class WeatherCommand extends AbstactCommand {
  private weatherScene: WeatherScene;

  constructor(
    @inject(TYPE_SCENES_CONTAINERS.WeatherScene) weatherScene: WeatherScene
  ) {
    super();
    this.weatherScene = weatherScene;
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

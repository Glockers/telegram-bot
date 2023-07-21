import { inject, injectable } from 'inversify';
import { AbstactCommand } from './command.class';
import { COMMAND } from 'bot/constants/command.enum';
import { TYPE_WEATHER_CONTAINERS } from 'container/weather/weather.type';
import { ISubscribeController } from 'bot/controllers/subscribe.controller';
import { SCENE } from 'bot/constants/scenes.enum';

@injectable()
export class SubscribeCommand extends AbstactCommand {
  subscribeController;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.SubscribeController) subscribeController: ISubscribeController
  ) {
    super();
    this.subscribeController = subscribeController;
  }

  handle(): void {
    this.subscribeOnWeather();
    this.unsubscribeFromWeather();
  }

  subscribeOnWeather(): void {
    this.bot.command(COMMAND.SUBSCRIBE, (ctx) =>
      ctx.scene.enter(SCENE.SUBSCRIBE_ON_WEATHER)
    );
  }

  unsubscribeFromWeather(): void {
    this.bot.command(COMMAND.UNSUBSCRIBE, (ctx) =>
      ctx.scene.enter(SCENE.UNSUBSCRIBE_FROM_WEATHER)
    );
  }
}

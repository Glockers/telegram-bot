import { inject, injectable } from 'inversify';
import { AbstactCommand } from './command.class';
import { COMMAND } from 'bot/constants/command.enum';
import { TYPE_WEATHER_CONTAINERS } from 'container/weather/weather.type';
import { ISubscribeController } from 'bot/controllers/subscribe.controller';

@injectable()
export class SubscribeCommand extends AbstactCommand {
  subscribeController;
  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.SubscribeController)
    subscribeController: ISubscribeController
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
      this.subscribeController.subscribeOnWeather(ctx)
    );
  }

  unsubscribeFromWeather(): void {
    this.bot.command(COMMAND.UNSUBSCRIBE, (ctx) =>
      this.subscribeController.unsubscribeFromWeather(ctx)
    );
  }
}

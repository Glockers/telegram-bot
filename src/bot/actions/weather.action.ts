import { inject, injectable } from 'inversify';
import { weatherMenu } from '@bot/buttons';
import { Actions, CommandName } from '@bot/constants';
import { IWeatherlController } from '@bot/controllers';
import { AbstactAction } from '@bot/interfaces';
import { catchAsyncFunction, getCommand } from '@common/helpers';
import { TYPE_WEATHER_CONTAINERS } from '@container/bot';

@injectable()
export class WeatherAction extends AbstactAction {
  private readonly weatherController: IWeatherlController;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.WeatherController) weatherController: IWeatherlController
  ) {
    super();
    this.weatherController = weatherController;
  }

  init(): void {
    this.bot.action(Actions.WEATHER, (ctx) => {
      catchAsyncFunction(ctx, () => ctx.editMessageText('Меню погода', weatherMenu));
    });

    this.bot.action(Actions.GET_WEATHER, ctx => {
      catchAsyncFunction(ctx, () => getCommand(CommandName.WEATHER, ctx));
    });

    this.bot.action(Actions.SUBSCRIBE_WEATHER, ctx => {
      catchAsyncFunction(ctx, () => getCommand(CommandName.SUBSCRIBE, ctx));
    });

    this.bot.action(Actions.GET_WEATHER_SUBSCRIBE, ctx => {
      catchAsyncFunction(ctx, () => this.weatherController.getAllWeatherSubscribs(ctx));
    });

    this.bot.action(/unsubscribe_weather\?(.*)/, (ctx) => {
      catchAsyncFunction(ctx, () => this.weatherController.deleteSubscribe(ctx));
    });
  }
}

import { weatherInfoTask, weatherMenu } from 'bot/buttons/weather.button';
import { CallbackQueryData, IBotContext } from 'bot/interfaces/context.interface';
import { ISubscribeWeatherService } from 'bot/services/subscribeWeather.service';
import { catchAsyncFunction } from 'common/helpers/catchAsync';
import { exctractUserIdFromChat, exctractcallbackQueryData } from 'common/helpers/contextHelpers';
import { TYPE_WEATHER_CONTAINERS } from 'container/bot/weather/weather.type';
import { inject, injectable } from 'inversify';

export interface IWeatherlController {
  getAllWeatherSubscribs: (ctx: IBotContext) => void;
  deleteSubscribe: (ctx: CallbackQueryData) => void;
}

@injectable()
export class WeatherController implements IWeatherlController {
  subscribeService: ISubscribeWeatherService;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.SubscribeService) subscribeService: ISubscribeWeatherService
  ) {
    this.subscribeService = subscribeService;
  }

  getAllWeatherSubscribs = (ctx: IBotContext) => {
    catchAsyncFunction(ctx, async () => {
      const userID = exctractUserIdFromChat(ctx);
      const subscriptions = await this.subscribeService.getWeatherSubscriptions(userID);
      subscriptions.length !== 0
        ? ctx.reply('Список подписок ', weatherInfoTask(subscriptions))
        : ctx.reply('У вас нет подписок');
    });
  };

  deleteSubscribe = async (ctx: CallbackQueryData) =>
    catchAsyncFunction(ctx, async () => {
      const subscribe = exctractcallbackQueryData(ctx);
      await this.subscribeService.deleteWeather(subscribe) ? ctx.editMessageText('Подписка отменена', weatherMenu) : ctx.reply('Задача не была удалена!', weatherMenu);
    });
}

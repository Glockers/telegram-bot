import { weatherInfoTask, weatherMenu } from '@bot/buttons/weather.button';
import { CallbackQueryData, IBotContext } from '@bot/interfaces/context.interface';
import { ISubscribeWeatherService } from '@bot/services/subscribeWeather.service';
import { exctractUserIdFromChat, exctractcallbackQueryData } from '@common/helpers/contextHelpers';
import { TYPE_WEATHER_CONTAINERS } from '@container/bot/weather/weather.type';
import { inject, injectable } from 'inversify';

export interface IWeatherlController {
  getAllWeatherSubscribs: (ctx: IBotContext) => Promise<void>;
  deleteSubscribe: (ctx: CallbackQueryData) => Promise<void>;
}

@injectable()
export class WeatherController implements IWeatherlController {
  private readonly subscribeService: ISubscribeWeatherService;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.SubscribeService) subscribeService: ISubscribeWeatherService
  ) {
    this.subscribeService = subscribeService;
  }

  getAllWeatherSubscribs = async (ctx: IBotContext): Promise<void> => {
    const userID = exctractUserIdFromChat(ctx);
    const subscriptions = await this.subscribeService.getWeatherSubscriptions(userID);
    subscriptions.length !== 0
      ? ctx.reply('Список подписок ', weatherInfoTask(subscriptions))
      : ctx.reply('У вас нет подписок');
  };

  deleteSubscribe = async (ctx: CallbackQueryData): Promise<void> => {
    const subscribe = exctractcallbackQueryData(ctx);
    await this.subscribeService.deleteWeather(subscribe) ? ctx.editMessageText('Подписка отменена', weatherMenu) : ctx.reply('Задача не была удалена!', weatherMenu);
  };
}

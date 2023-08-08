import { inject, injectable } from 'inversify';
import { weatherInfoTask, weatherMenu } from '@bot/buttons';
import { CallbackQueryData, IBotContext } from '@bot/interfaces';
import { ISubscribeWeatherService } from '@bot/services';
import { exctractUserIdFromChat, exctractcallbackQueryData } from '@common/helpers';
import { TYPE_WEATHER_CONTAINERS } from '@container/bot/weather';

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

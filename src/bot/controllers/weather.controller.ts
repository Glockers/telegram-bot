import { inject, injectable } from 'inversify';
import { weatherInfoTask, weatherMenu } from '@bot/buttons';
import { CallbackQueryData, IBotContext } from '@bot/interfaces';
import { ISubscribeWeatherService } from '@bot/services';
import { exctractUserIdFromChat, exctractcallbackQueryData } from '@common/helpers';
import { TYPE_WEATHER_CONTAINERS } from '@container/bot/weather';
import {
  NO_SUBSCRIPTIONS, SUBSCRIPTION_CANCELLED,
  TASK_NOT_REMOVED, TASK_SUB_LIST
} from '@bot/constants';

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
      ? ctx.reply(TASK_SUB_LIST, weatherInfoTask(subscriptions))
      : ctx.reply(NO_SUBSCRIPTIONS);
  };

  deleteSubscribe = async (ctx: CallbackQueryData): Promise<void> => {
    const subscribe = exctractcallbackQueryData(ctx);
    await this.subscribeService.deleteWeather(subscribe)
      ? ctx.editMessageText(SUBSCRIPTION_CANCELLED, weatherMenu)
      : ctx.reply(TASK_NOT_REMOVED, weatherMenu);
  };
}

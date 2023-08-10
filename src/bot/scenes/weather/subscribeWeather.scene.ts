import { Scenes } from 'telegraf';
import { inject, injectable } from 'inversify';
import { ISceneBehave, SessionSubscribeWeather } from '@bot/scenes';
import {
  AppScenes, CITY_NOT_FOUND,
  INVALID_TIME_FORMAT, SUCCESSFUL_WEATHER_SUB,
  WRITE_CITY, WRITE_TIME
} from '@bot/constants';
import { ISubscribeWeatherService, IWeatherService } from '@bot/services';
import { TYPE_WEATHER_CONTAINERS } from '@container/bot/weather';
import { IBotContext } from '@bot/interfaces';
import { exctractUserIdFromChat, extractMessageFromChat } from '@common/helpers';
import { convertStringToDate } from '@common/utils';
import { backToWeatherMenu } from '@bot/buttons';

export interface SubscribeWeatherData {
  city: string,
  time: string
}

@injectable()
export class SubscribeOnWeatherScene implements ISceneBehave {
  private readonly scene: Scenes.WizardScene<IBotContext>;

  private readonly subscribeService: ISubscribeWeatherService;

  private readonly weatherService: IWeatherService;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.SubscribeService) subscribeService: ISubscribeWeatherService,
    @inject(TYPE_WEATHER_CONTAINERS.WeatherService) weatherService: IWeatherService
  ) {
    this.subscribeService = subscribeService;
    this.weatherService = weatherService;
    this.scene = new Scenes.WizardScene<IBotContext>(
      AppScenes.SUBSCRIBE_ON_WEATHER,
      this.askCity,
      this.askTime,
      this.exctractData
    );
  }

  getInstance(): Scenes.WizardScene<IBotContext> {
    return this.scene;
  }

  askCity = async (ctx: IBotContext): Promise<void> => {
    ctx.reply(WRITE_CITY);
    ctx.scene.session.subscribeWeather = {} as SessionSubscribeWeather;
    ctx.wizard.next();
  };

  askTime = async (ctx: IBotContext): Promise<void> => {
    const city = extractMessageFromChat(ctx);
    const checkedCity = await this.weatherService.getWeatherByCity(city);
    if (!checkedCity) {
      ctx.reply(CITY_NOT_FOUND);
      return;
    }
    ctx.scene.session.subscribeWeather.city = city;
    ctx.reply(WRITE_TIME);
    ctx.wizard.next();
  };

  exctractData = async (ctx: IBotContext): Promise<void> => {
    const time = extractMessageFromChat(ctx);
    const convertedTime = convertStringToDate(time, ctx.message.date);
    console.log(convertedTime);
    if (!convertedTime) {
      ctx.reply(INVALID_TIME_FORMAT);
      return;
    }
    ctx.scene.session.subscribeWeather.time = convertedTime;

    const userID = exctractUserIdFromChat(ctx);
    const resOperation = this.subscribeService.subscibeOnWeather(ctx.scene.session.subscribeWeather, userID);
    if (resOperation) ctx.reply(SUCCESSFUL_WEATHER_SUB, backToWeatherMenu);
    ctx.scene.leave();
  };
}

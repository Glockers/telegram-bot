import { SCENE } from 'bot/constants/scenes.enum';
import { Scenes } from 'telegraf';
import { ISubscribeWeatherService } from 'bot/services/subscribeWeather.service';
import { ISceneBehave } from '../scene.type';
import { inject, injectable } from 'inversify';
import { TYPE_WEATHER_CONTAINERS } from 'container/bot/weather/weather.type';
import { IBotContext } from 'bot/interfaces/context.interface';
import { exctractUserIdFromChat, extractMessageFromChat } from 'common/helpers/contextHelpers';
import { ISceneSubscribeWeather } from './weather.interface';
import { convertStringToDate } from 'common/utils/dateUtils';
import { UserError } from 'common/exceptions/userError';

export interface SubscribeWeatherData {
  city: string,
  time: string
}

@injectable()
export class SubscribeOnWeatherScene implements ISceneBehave {
  private readonly scene: Scenes.WizardScene<IBotContext>;

  private readonly subscribeService: ISubscribeWeatherService;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.SubscribeService) subscribeService: ISubscribeWeatherService
  ) {
    this.subscribeService = subscribeService;
    this.scene = new Scenes.WizardScene<IBotContext>(
      SCENE.SUBSCRIBE_ON_WEATHER,
      this.askCity,
      this.askTime,
      this.exctractData
    );
  }

  getInstance(): Scenes.WizardScene<IBotContext> {
    return this.scene;
  }

  askCity = async (ctx: IBotContext): Promise<void> => {
    ctx.reply('Введите город');
    ctx.scene.session.subscribeWeather = {} as ISceneSubscribeWeather;
    ctx.wizard.next();
  };

  askTime = async (ctx: IBotContext): Promise<void> => {
    const city = extractMessageFromChat(ctx);
    ctx.scene.session.subscribeWeather.city = city;
    ctx.reply('Введите время');
    ctx.wizard.next();
  };

  exctractData = async (ctx: IBotContext): Promise<void> => {
    const time = extractMessageFromChat(ctx);
    const convertedTime = convertStringToDate(time);
    if (!convertedTime) throw UserError.sendMessage('Введена неккоректо дата!');
    ctx.scene.session.subscribeWeather.time = convertedTime;

    const userID = exctractUserIdFromChat(ctx);
    const resOperation = this.subscribeService.subscibeOnWeather(ctx.scene.session.subscribeWeather, userID);
    if (resOperation) ctx.reply('Вы успешно подписались!');
    ctx.scene.leave();
  };
}

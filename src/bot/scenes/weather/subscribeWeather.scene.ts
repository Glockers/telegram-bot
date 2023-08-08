import { Scenes } from 'telegraf';
import { inject, injectable } from 'inversify';
import { ISceneBehave, SessionSubscribeWeather } from '@bot/scenes';
import { AppScenes } from '@bot/constants';
import { ISubscribeWeatherService } from '@bot/services';
import { TYPE_WEATHER_CONTAINERS } from '@container/bot/weather';
import { IBotContext } from '@bot/interfaces';
import { exctractUserIdFromChat, extractMessageFromChat } from '@common/helpers';
import { convertStringToDate } from '@common/utils';
import { UserError } from '@common/exceptions';

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
    ctx.reply('Введите город');
    ctx.scene.session.subscribeWeather = {} as SessionSubscribeWeather;
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

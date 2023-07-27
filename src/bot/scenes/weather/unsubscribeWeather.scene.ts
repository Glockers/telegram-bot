import { SCENE } from 'bot/constants/scenes.enum';
import { ISubscribeWeatherService } from 'bot/services/subscribeWeather.service';
import { Scenes } from 'telegraf';
import { ISceneBehave } from '../scene.type';
import { inject, injectable } from 'inversify';
import { TYPE_WEATHER_CONTAINERS } from 'container/bot/weather/weather.type';
import { IBotContext } from 'bot/context/context.interface';
import { ISceneUnsubscribeWeather } from './weather.interface';
import { extractMessageFromChat } from 'utils/contextHelpers';
import { catchAsyncFunction } from 'utils/catchAsync';

@injectable()
export class UnsubscribeOnWeatherScene implements ISceneBehave {
  scene: Scenes.WizardScene<IBotContext>;

  service: ISubscribeWeatherService;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.SubscribeService) service: ISubscribeWeatherService
  ) {
    this.service = service;
    this.scene = new Scenes.WizardScene<IBotContext>(
      SCENE.UNSUBSCRIBE_FROM_WEATHER,
      this.askID,
      this.exctractData
    );
  }

  public initService(service: ISubscribeWeatherService) {
    if (!this.service) {
      this.service = service;
    }
  }

  getInstance() {
    return this.scene;
  }

  private askID = async (ctx: IBotContext) => {
    ctx.reply('Введите ID подписки');
    ctx.scene.session.unsubscribeWeather = {} as ISceneUnsubscribeWeather;
    return ctx.wizard.next();
  };

  private exctractData = (ctx: IBotContext) =>
    catchAsyncFunction(ctx, async () => {
      const id = Number(extractMessageFromChat(ctx));
      ctx.scene.session.unsubscribeWeather.id = id;
      const resultDelete = await this.service.deleteWeather(ctx.scene.session.unsubscribeWeather);
      if (resultDelete) ctx.reply('Вы отменили подписку');
      return ctx.scene.leave();
    });
}

import { Scenes } from 'telegraf';
import { inject, injectable } from 'inversify';
import { ISceneBehave } from '@bot/scenes';
import { AppScenes } from '@bot/constants';
import { ISubscribeWeatherService } from '@bot/services';
import { TYPE_WEATHER_CONTAINERS } from '@container/bot/weather';
import { IBotContext } from '@bot/interfaces';
import { SessionUnsubscribeWeather } from './weather.interface';
import { extractMessageFromChat, catchAsyncFunction } from '@common/helpers';

@injectable()
export class UnsubscribeOnWeatherScene implements ISceneBehave {
  scene: Scenes.WizardScene<IBotContext>;

  service: ISubscribeWeatherService;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.SubscribeService) service: ISubscribeWeatherService
  ) {
    this.service = service;
    this.scene = new Scenes.WizardScene<IBotContext>(
      AppScenes.UNSUBSCRIBE_FROM_WEATHER,
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
    ctx.scene.session.unsubscribeWeather = {} as SessionUnsubscribeWeather;
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

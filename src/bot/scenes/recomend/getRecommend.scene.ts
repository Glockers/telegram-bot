import { ISceneBehave } from '@bot/scenes';
import { inject, injectable } from 'inversify';
import { IBotContext } from '@bot/interfaces';
import { Scenes } from 'telegraf';
import { AppScenes, CITY_NOT_FOUND, WRITE_CITY } from '@bot/constants';
import { extractMessageFromChat } from '@common/helpers';
import { TYPE_RECOMMEND_CONTAINERS } from '@container/bot/recommend';
import { IRecommendService, IWeatherService } from '@bot/services';
import { formatRecommendPlace } from '@common/utils';
import { TYPE_WEATHER_CONTAINERS } from '@container/bot/weather/weather.type';

@injectable()
export class RecommendScene implements ISceneBehave {
  private scene: Scenes.WizardScene<IBotContext>;

  private readonly recommendService: IRecommendService;

  private readonly weatherService: IWeatherService;

  constructor(
    @inject(TYPE_RECOMMEND_CONTAINERS.RecommendService) recommendService: IRecommendService,
    @inject(TYPE_WEATHER_CONTAINERS.WeatherService) weatherService: IWeatherService

  ) {
    this.recommendService = recommendService;
    this.weatherService = weatherService;
    this.scene = new Scenes.WizardScene<IBotContext>(
      AppScenes.GET_RECOMMEND_PLACE,
      this.askCity,
      this.askRate
    );
  }

  getInstance(): Scenes.WizardScene<IBotContext> {
    return this.scene;
  }

  askCity = async (ctx: IBotContext): Promise<void> => {
    ctx.reply(WRITE_CITY);
    ctx.wizard.next();
  };

  askRate = async (ctx: IBotContext): Promise<void> => {
    const city = extractMessageFromChat(ctx);
    const checkedCity = await this.weatherService.getWeatherByCity(city);
    if (!checkedCity) {
      ctx.reply(CITY_NOT_FOUND);
      return;
    }
    ctx.scene.session.places.city = city;
    this.handle(ctx);
  };

  handle = async (ctx: IBotContext): Promise<void> => {
    const places = await this.recommendService.getPlace(ctx.scene.session.places);
    ctx.replyWithHTML(formatRecommendPlace(places));
    return ctx.scene.leave();
  };
}

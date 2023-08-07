import { inject, injectable } from 'inversify';
import { ISceneBehave } from '../scene.type';
import { IBotContext } from 'bot/interfaces/context.interface';
import { Scenes } from 'telegraf';
import { SCENE } from 'bot/constants/scenes.enum';
import { extractMessageFromChat } from 'common/helpers/contextHelpers';
import { TYPE_RECOMMEND_CONTAINERS } from 'container/bot/recommend/recommend.type';
import { IRecommendService } from 'bot/services/recommend.service';
import { formatRecommendPlace } from 'common/utils/replyUtil';

@injectable()
export class RecommendScene implements ISceneBehave {
  private scene: Scenes.WizardScene<IBotContext>;

  private readonly recommendService: IRecommendService;

  constructor(
    @inject(TYPE_RECOMMEND_CONTAINERS.RecommendService) recommendService: IRecommendService
  ) {
    this.recommendService = recommendService;
    this.scene = new Scenes.WizardScene<IBotContext>(
      SCENE.GET_RECOMMEND_PLACE,
      this.askCity,
      this.askRate
    );
  }

  getInstance(): Scenes.WizardScene<IBotContext> {
    return this.scene;
  }

  askCity = async (ctx: IBotContext): Promise<void> => {
    ctx.reply('Введите название города');
    ctx.wizard.next();
  };

  askRate = async (ctx: IBotContext): Promise<void> => {
    const city = extractMessageFromChat(ctx);
    ctx.scene.session.places.city = city;

    this.handle(ctx);
  };

  handle = async (ctx: IBotContext): Promise<void> => {
    const places = await this.recommendService.getPlace(ctx.scene.session.places);
    ctx.replyWithHTML(formatRecommendPlace(places));
    return ctx.scene.leave();
  };
}

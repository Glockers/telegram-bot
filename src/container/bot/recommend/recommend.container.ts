import { IContainer, InversifyContainer } from 'container/inversifyContainer';
import { TYPE_RECOMMEND_CONTAINERS } from './recommend.type';
import { IRecommendController, RecommendController } from '../../../bot/controllers/recommend.controller';
import { IRecommendService, RecommendService } from 'bot/services/recommend.service';

export class RecommendContainer implements IContainer {
  initContainer(): void {
    InversifyContainer.bind<IRecommendController>(TYPE_RECOMMEND_CONTAINERS.RecommendController).to(RecommendController);
    InversifyContainer.bind<IRecommendService>(TYPE_RECOMMEND_CONTAINERS.RecommendService).to(RecommendService);
  }
}

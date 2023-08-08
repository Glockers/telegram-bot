import { SessionPlace } from '@bot/scenes/recomend/recommend.type';
import { TYPE_API_CONTAINERS } from '@container/api/apiContainer.type';
import { RecommendAPI } from '@infra/api/recommend/place';
import { Feature } from '@infra/api/recommend/place.type';
import { inject, injectable } from 'inversify';

export interface IRecommendService {
  getPlace: (sessionPlace: SessionPlace) => Promise<Feature[]>
}

@injectable()
export class RecommendService implements IRecommendService {
  private readonly recommendAPI: RecommendAPI;

  constructor(@inject(TYPE_API_CONTAINERS.RecommendAPI) recommendAPI: RecommendAPI) {
    this.recommendAPI = recommendAPI;
  }

  async getPlace(sessionPlace: SessionPlace): Promise<Feature[]> {
    const places = await this.recommendAPI.getPlaces(sessionPlace.city, sessionPlace.kinds);
    return places.features;
  };
}

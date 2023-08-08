import { inject, injectable } from 'inversify';
import { SessionPlace } from '@bot/scenes';
import { TYPE_API_CONTAINERS } from '@container/api';
import { RecommendAPI, Feature } from '@infra/api';

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

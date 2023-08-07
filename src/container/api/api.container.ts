import { IContainer, InversifyContainer } from 'container/inversifyContainer';
import { API } from 'infra/api/api.class';
import { PixelsAPI } from 'infra/api/animal/animal';
import { TYPE_API_CONTAINERS } from './apiContainer.type';
import { WeatherAPI } from 'infra/api/weather/weather';
import { RecommendAPI } from 'infra/api/recommend/place';

export class APIContainer implements IContainer {
  initContainer(): void {
    InversifyContainer.bind<API>(TYPE_API_CONTAINERS.PixelsAPI).to(PixelsAPI);
    InversifyContainer.bind<API>(TYPE_API_CONTAINERS.WeatherAPI).to(WeatherAPI);
    InversifyContainer.bind<RecommendAPI>(TYPE_API_CONTAINERS.RecommendAPI).to(RecommendAPI);
  }
}

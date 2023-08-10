import { IContainer, InversifyContainer } from '@container/inversifyContainer';
import { API, PixelsAPI, WeatherAPI, RecommendAPI } from '@infra/api';
import { TYPE_API_CONTAINERS } from './apiContainer.type';

export class APIContainer implements IContainer {
  initContainer(): void {
    InversifyContainer.bind<API>(TYPE_API_CONTAINERS.PixelsAPI).to(PixelsAPI);
    InversifyContainer.bind<API>(TYPE_API_CONTAINERS.WeatherAPI).to(WeatherAPI);
    InversifyContainer.bind<RecommendAPI>(TYPE_API_CONTAINERS.RecommendAPI).to(RecommendAPI);
  }
}

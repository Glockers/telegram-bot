import { IContainer } from 'container/container.type';
import { InversifyContainer } from 'container/inversifyContainer';
import { API } from 'infra/api/api.class';
import { PixelsAPI } from 'infra/api/pexels/pixelAxios.config';
import { TYPE_API_CONTAINERS } from './apiContainer.type';
import { WeatherAPI } from 'infra/api/weather/weatherAPI.config';

export class APIContainer implements IContainer {
  initContainer() {
    InversifyContainer.bind<API>(TYPE_API_CONTAINERS.PixelsAPI).to(PixelsAPI);
    InversifyContainer.bind<API>(TYPE_API_CONTAINERS.WeatherAPI).to(WeatherAPI);
  }
}

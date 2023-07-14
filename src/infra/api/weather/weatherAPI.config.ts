import { IConfigService } from '@config/config.service';
import { API } from 'infra/api/api.class';
import axios from 'axios';
import { inject, injectable } from 'inversify';
import { TYPE_BOT_CONTAINERS } from 'container/bot/botContainer.type';

@injectable()
export class WeatherAPI extends API {
  private readonly BASE_URL = 'https://api.openweathermap.org';

  constructor(@inject(TYPE_BOT_CONTAINERS.ConfigService) configService: IConfigService) {
    super();
    this.configService = configService;
    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL
    });
  }

  getInstance() {
    return this.axiosInstance;
  }
}

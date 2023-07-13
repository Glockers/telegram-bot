import { IConfigService } from '@config/config.service';
import { TYPE_CONTAINERS } from 'container/typeContainers';
import { inject, injectable } from 'inversify';
import axios, { AxiosInstance } from 'axios';
import { API } from 'api/api.class';

@injectable()
export class PixelsAPI extends API {
  private readonly BASE_URL = 'https://api.pexels.com/v1/';

  configService: IConfigService;

  axiosInstance: AxiosInstance;

  constructor(@inject(TYPE_CONTAINERS.ConfigService) configService: IConfigService) {
    super(configService);
    this.configService = configService;
    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL,
      headers: {
        Authorization: this.configService.get('PEXEL_TOKEN'),
        'Content-Type': 'application/json'
      }
    });
  }

  getInstance() {
    return this.axiosInstance;
  }
}

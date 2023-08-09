import { ConfigService, IConfigService } from '@config/config.service';
import { AxiosInstance } from 'axios';
import { InversifyContainer } from '@container/inversifyContainer';

export abstract class API {
  protected axiosInstance!: AxiosInstance;

  protected configService!: IConfigService;

  constructor() {
    this.configService = InversifyContainer.get(ConfigService);
  }

  abstract getInstance(): AxiosInstance
}

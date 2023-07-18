import { ConfigService, IConfigService } from '@config/config.service';
import { AxiosInstance } from 'axios';
import { InversifyContainer } from 'container/inversifyContainer';

export abstract class API {
  protected axiosInstance!: AxiosInstance;

  // eslint-disable-next-line no-dupe-class-members
  protected configService!: IConfigService;

  constructor() {
    this.configService = InversifyContainer.get(ConfigService);
  }

  abstract getInstance(): AxiosInstance
}

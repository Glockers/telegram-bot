import { IConfigService } from '@config/config.service';
import { AxiosInstance } from 'axios';

export abstract class API {
  configService!: IConfigService;

  axiosInstance!: AxiosInstance;

  // eslint-disable-next-line no-useless-constructor
  constructor() { }

  abstract getInstance(): AxiosInstance
}

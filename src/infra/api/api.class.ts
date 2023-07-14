import { IConfigService } from '@config/config.service';
import { AxiosInstance } from 'axios';

export abstract class API {
  // eslint-disable-next-line no-useless-constructor
  constructor(readonly configService: IConfigService) { }

  abstract getInstance(): AxiosInstance
}

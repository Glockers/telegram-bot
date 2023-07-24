import { ConfigService, IConfigService } from '@config/config.service';
import { IContainer, InversifyContainer } from 'container/inversifyContainer';
import { TYPE_CONFIG_CONTAINERS } from './config.type';

export class ConfigContainer implements IContainer {
  initContainer() {
    InversifyContainer.bind<IConfigService>(TYPE_CONFIG_CONTAINERS.ConfigService).to(ConfigService).inSingletonScope();
  }
}

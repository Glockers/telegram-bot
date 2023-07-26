// import { ConfigService, IConfigService } from '@config/config.service';
// import { IContainer, InversifyContainer } from 'container/inversifyContainer';
// import { TYPE_BOT_CONTAINERS } from 'container/bot/botContainer.type';

import { IContainer } from 'container/inversifyContainer';

export class ConfigContainer implements IContainer {
  initContainer() {
    // InversifyContainer.bind<IConfigService>(TYPE_BOT_CONTAINERS.ConfigService).to(ConfigService).inSingletonScope();
  }
}

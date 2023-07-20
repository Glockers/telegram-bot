import { ConfigService, IConfigService } from '@config/config.service';
import { Bot, IBot } from 'bot/bot';
import { IContainer, InversifyContainer } from 'container/inversifyContainer';
import { TYPE_BOT_CONTAINERS } from './botContainer.type';

export class BotContainer implements IContainer {
  initContainer() {
    InversifyContainer.bind<IBot>(TYPE_BOT_CONTAINERS.Bot).to(Bot).inSingletonScope();
    InversifyContainer.bind<IConfigService>(TYPE_BOT_CONTAINERS.ConfigService).to(ConfigService).inSingletonScope();
  }
}

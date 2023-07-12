import { IConfigService } from '@config/config.interface';
import { ConfigService } from '@config/config.service';
import { Bot, IBot } from 'bot';
import { TYPES } from 'container/typeContainers';
import { Container } from 'inversify';

const InversifyContainer = new Container();

InversifyContainer.bind<IBot>(TYPES.Bot).to(Bot);
InversifyContainer.bind<IConfigService>(TYPES.ConfigService).to(ConfigService);

export { InversifyContainer };

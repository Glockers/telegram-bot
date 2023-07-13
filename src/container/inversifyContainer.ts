import { ConfigService, IConfigService } from '@config/config.service';
import { API } from 'api/api.class';
import { PixelsAPI } from 'api/pexels/pixelAxios.config';
import { Bot, IBot } from 'bot';
import { TYPE_CONTAINERS } from 'container/typeContainers';
import { Container } from 'inversify';

const InversifyContainer = new Container({ skipBaseClassChecks: true });

InversifyContainer.bind<IBot>(TYPE_CONTAINERS.Bot).to(Bot);
InversifyContainer.bind<IConfigService>(TYPE_CONTAINERS.ConfigService).to(ConfigService).inSingletonScope();
InversifyContainer.bind<API>(TYPE_CONTAINERS.PixelsAPI).to(PixelsAPI);

export { InversifyContainer };

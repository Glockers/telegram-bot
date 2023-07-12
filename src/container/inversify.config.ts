import { IConfigService } from '@config/config.interface';
import { ConfigService } from '@config/config.service';
import { Bot, IBot } from 'bot/bot';
import { TYPES } from 'container/types';
import { Container } from 'inversify';

const myContainer = new Container();

myContainer.bind<IBot>(TYPES.Bot).to(Bot);
myContainer.bind<IConfigService>(TYPES.ConfigService).to(ConfigService);

export { myContainer };

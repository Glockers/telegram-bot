import { ISubscribeService } from 'bot/services/subscribe.service';
import { Scenes } from 'telegraf';

export interface ISceneBehave {
  getInstance: () => Scenes.WizardScene<any>;
}

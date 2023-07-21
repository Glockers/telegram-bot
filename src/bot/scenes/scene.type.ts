import { Scenes } from 'telegraf';

export interface ISceneBehave {
  getInstance: () => Scenes.WizardScene<any>;
}

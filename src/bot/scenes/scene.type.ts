import { Scenes } from 'telegraf';
import { IBotContext } from '@bot/interfaces';

export type SceneReturnType = Scenes.WizardScene<IBotContext> | Scenes.BaseScene<IBotContext>

export interface ISceneBehave {
  getInstance: () => SceneReturnType;
}

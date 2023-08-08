import { IBotContext } from '@bot/interfaces/context.interface';
import { Scenes } from 'telegraf';

export type SceneReturnType = Scenes.WizardScene<IBotContext> | Scenes.BaseScene<IBotContext>

export interface ISceneBehave {
  getInstance: () => SceneReturnType;
}

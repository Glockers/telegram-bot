import { IBotContext } from 'bot/context/context.interface';
import { Scenes } from 'telegraf';

export type SceneReturnType = Scenes.WizardScene<IBotContext> | Scenes.BaseScene<IBotContext>

export interface ISceneBehave {
  getInstance: () => SceneReturnType;
}

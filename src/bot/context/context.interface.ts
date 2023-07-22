import { Context, Scenes } from 'telegraf';
import { IBotWizardSessionData } from './sceneSessionData.interface';

export interface IBotContext extends Context {
  scene: Scenes.SceneContextScene<IBotContext, IBotWizardSessionData>;
  wizard: Scenes.WizardContextWizard<IBotContext>;
}

export interface ISceneStage extends Scenes.Stage<IBotContext, Scenes.SceneSessionData> { }

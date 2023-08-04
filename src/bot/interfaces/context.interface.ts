import { Context, NarrowedContext, Scenes } from 'telegraf';
import { IBotWizardSessionData } from './sceneSessionData.interface';
import { CallbackQuery, Update } from 'telegraf/typings/core/types/typegram';

export interface IBotContext extends Context {
  scene: Scenes.SceneContextScene<IBotContext, IBotWizardSessionData>;
  wizard: Scenes.WizardContextWizard<IBotContext>;
}

export interface ISceneStage extends Scenes.Stage<IBotContext, Scenes.SceneSessionData> { }

export type CallbackQueryData = NarrowedContext<IBotContext & {
  match: RegExpExecArray;
}, Update.CallbackQueryUpdate<CallbackQuery>>

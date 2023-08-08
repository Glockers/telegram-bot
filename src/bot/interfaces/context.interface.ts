import { Context, NarrowedContext, Scenes } from 'telegraf';
import { CallbackQuery, Update } from 'telegraf/typings/core/types/typegram';
import { IBotWizardSessionData } from './sceneSessionData.interface';

export interface IBotContext extends Context {
  scene: Scenes.SceneContextScene<IBotContext, IBotWizardSessionData>;
  wizard: Scenes.WizardContextWizard<IBotContext>;
  update: Update
}

export interface ISceneStage extends Scenes.Stage<IBotContext, Scenes.SceneSessionData> { }

export type CallbackQueryData = NarrowedContext<IBotContext & {
  match: RegExpExecArray;
}, Update.CallbackQueryUpdate<CallbackQuery>>

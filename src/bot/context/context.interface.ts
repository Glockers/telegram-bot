import { Context, Scenes } from 'telegraf';

export interface sessionData {}

// export type TBaseContext = Scenes.SceneContext<IBotContext>;

// export type TWizardContext = Scenes.WizardContext<IBotContext>;

export interface IBotContext extends Context {
  session: sessionData;
  scene: Scenes.SceneContextScene<any>;
  wizard: Scenes.WizardContextWizard<any>;
}

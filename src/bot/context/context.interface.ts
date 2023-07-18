import { Context, Scenes } from 'telegraf';

export interface sessionData {

}

export type IBotContext = Scenes.SceneContext & Context & {
  session: sessionData
}

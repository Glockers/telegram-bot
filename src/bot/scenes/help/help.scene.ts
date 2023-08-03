import { Scenes } from 'telegraf';
import { ISceneBehave } from '../scene.type';
import { IBotContext } from 'bot/interfaces/context.interface';
import { SCENE } from 'bot/constants/scenes.enum';
import { injectable } from 'inversify';

@injectable()
export class HelpScene implements ISceneBehave {
  scene: Scenes.BaseScene<IBotContext>;

  constructor() {
    this.scene = new Scenes.BaseScene<IBotContext>(SCENE.HELP);
    this.init();
  }

  getInstance() {
    return this.scene;
  };

  init() {
    // this.scene.enter(ctx => {
    //   ctx.reply('This is help message!', helpMenu);
    // });
  }
}

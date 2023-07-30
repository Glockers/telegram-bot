import { Markup, Scenes } from 'telegraf';
import { ISceneBehave } from '../scene.type';
import { IBotContext } from 'bot/context/context.interface';
import { SCENE } from 'bot/constants/scenes.enum';
import { injectable } from 'inversify';
import { ACTION_NAME } from 'bot/constants/actions.enum';

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
    this.scene.enter(ctx => {
      ctx.reply('This is help message!', Markup.inlineKeyboard([
        [
          Markup.button.callback('Котики', ACTION_NAME.CAT),
          Markup.button.callback('Cобачки', ACTION_NAME.DOG)
        ],
        [
          Markup.button.callback('Погода', 'weather')
        ],
        [
          Markup.button.callback('Задачи', 'order')
        ],
        [
          Markup.button.callback('Достопремичательности', 'order')
        ]
      ]
      ));
    });
  }
}

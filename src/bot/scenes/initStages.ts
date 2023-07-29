import { Scenes } from 'telegraf';
import { TYPE_SCENES_CONTAINERS } from 'container/bot/scenes/scenes.type';
import { InversifyContainer } from 'container/inversifyContainer';
import { ISceneBehave, SceneReturnType } from './scene.type';
import { IBotContext, ISceneStage } from 'bot/context/context.interface';

export class Stage {
  private scenes: SceneReturnType[] = [];

  private stage: ISceneStage;

  constructor() {
    this.init();
    this.stage = new Scenes.Stage<IBotContext>([...this.scenes], {
      ttl: 24 * 60 * 60 // TODO вынести
    });
    this.initMiddleware();
  }

  private init() {
    Object.keys(TYPE_SCENES_CONTAINERS).forEach((key) => {
      const command =
        TYPE_SCENES_CONTAINERS[key as keyof typeof TYPE_SCENES_CONTAINERS];
      this.scenes.push(
        InversifyContainer.get<ISceneBehave>(command).getInstance()
      );
    });
  }

  private cancelScene(ctx: IBotContext, next: () => Promise<void>) {
    // const message = ctx?.message ? extractMessageFromChat(ctx) : null;
    // const isSceneEmpty = Object.keys(ctx.scene.session).length;

    // if (message && isSceneEmpty && message === '/cancel') {
    //   ctx.reply('Вы отменили действие. Теперь можете использовать команды!');
    //   return ctx.scene.leave();
    // }

    // if (message && message && isSceneEmpty && isCommand(message)) {
    //   return ctx.reply('Введите команду /cancel, чтобы отменить текущую операцию.');
    // }

    next();
  }

  private initMiddleware() {
    this.stage.use(this.cancelScene);
  }

  getInstance() {
    return this.stage;
  }
}

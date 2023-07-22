import { Scenes } from 'telegraf';
import { TYPE_SCENES_CONTAINERS } from 'container/scenes/scenes.type';
import { InversifyContainer } from 'container/inversifyContainer';
import { ISceneBehave, SceneReturnType } from './scene.type';
import { IBotContext, ISceneStage } from 'bot/context/context.interface';
import { extractMessageFromChat } from 'utils/extractMessage';

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

  // TODO next type
  private cancelScene(ctx: IBotContext, next: any) {
    const message = extractMessageFromChat(ctx);
    const commandCancel = message.startsWith('/') ? message : '/' + message;
    if (message === commandCancel) {
      ctx.reply('Вы успешно отменили комманду');
      return ctx.scene.leave();
    }

    next();
  }

  private initMiddleware() {
    this.stage.use(this.cancelScene);
  }

  getInstance() {
    return this.stage;
  }
}

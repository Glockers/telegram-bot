import { Scenes } from 'telegraf';
import { TYPE_SCENES_CONTAINERS } from 'container/bot/scenes/scenes.type';
import { InversifyContainer } from 'container/inversifyContainer';
import { ISceneBehave, SceneReturnType } from './scene.type';
import { IBotContext, ISceneStage } from 'bot/interfaces/context.interface';
import { getCommand } from 'common/helpers/commandUtil';
import { COMMAND_NAME } from 'bot/constants/command.enum';
import { extractMessageFromChat } from 'common/helpers/contextHelpers';
import { isCommand } from 'common/utils/isCommand';

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
    const message = ctx?.message ? extractMessageFromChat(ctx) : null;
    const isSceneEmpty = Object.keys(ctx.scene.session).length;

    if (message && message && isSceneEmpty && isCommand(message)) {
      ctx.scene.leave();
      return getCommand(message.substring(1) as COMMAND_NAME, ctx);
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

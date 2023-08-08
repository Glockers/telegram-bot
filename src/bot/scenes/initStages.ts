import { Scenes } from 'telegraf';
import { TYPE_SCENES_CONTAINERS } from '@container/bot/scenes';
import { InversifyContainer } from '@container/inversifyContainer';
import { ISceneBehave, SceneReturnType } from './scene.type';
import { IBotContext, ISceneStage } from '@bot/interfaces';
import { getCommand, extractMessageFromChat } from '@common/helpers';
import { CommandName, TTL } from '@bot/constants';
import { isCommand } from '@common/utils';

export class Stage {
  private scenes: SceneReturnType[] = [];

  private stage: ISceneStage;

  constructor() {
    this.init();
    this.stage = new Scenes.Stage<IBotContext>([...this.scenes], {
      ttl: TTL
    });
    this.initMiddleware();
  }

  private init(): void {
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

    if (message && isSceneEmpty && isCommand(message)) {
      ctx.scene.leave();
      return getCommand(message.substring(1) as CommandName, ctx);
    }
    next();
  }

  private initMiddleware(): void {
    this.stage.use(this.cancelScene);
  }

  getInstance(): ISceneStage {
    return this.stage;
  }
}

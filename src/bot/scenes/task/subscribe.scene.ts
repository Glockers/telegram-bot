import { Scenes } from 'telegraf';
import { inject, injectable } from 'inversify';
import { ISceneBehave } from '@bot/scenes';
import { AppScenes } from '@bot/constants';
import { TYPE_TASK_CONTAINERS } from '@container/bot/task';
import { IBotContext } from '@bot/interfaces';
import { extractMessageFromChat } from '@common/helpers';
import { convertStringToDate } from '@common/utils';
import { backMenuTask } from '@bot/buttons';
import { SubscribeTaskService } from '@bot/services';
import { Message } from 'telegraf/typings/core/types/typegram';

@injectable()
export class SubscribeTaskScene implements ISceneBehave {
  private scene: Scenes.WizardScene<IBotContext>;

  private subscribeTaskService: SubscribeTaskService;

  constructor(
    @inject(TYPE_TASK_CONTAINERS.SubscribeTaskService) subscribeTaskService: SubscribeTaskService

  ) {
    this.subscribeTaskService = subscribeTaskService;

    this.scene = new Scenes.WizardScene<IBotContext>(
      AppScenes.SET_NOTIFICATION_TASK,
      this.askTime,
      this.extractTime
    );
  }

  getInstance(): Scenes.WizardScene<IBotContext> {
    return this.scene;
  }

  askTime(ctx: IBotContext): void {
    ctx.editMessageText('Введите время (формат: 15:59)');
    ctx.wizard.next();
  };

  extractTime = (ctx: IBotContext): Promise<Message.TextMessage> | undefined => {
    const time = convertStringToDate(extractMessageFromChat(ctx));
    if (!time) return ctx.reply('Неверно введена дата. Формат даты: 15:59');
    ctx.scene.session.subscribeTask.time = time;
    this.handle(ctx);
  };

  handle = async (ctx: IBotContext) => {
    await this.subscribeTaskService.subscribeOnTask(ctx.scene.session.subscribeTask);
    ctx.reply('Вы установили уведомление на задачу', backMenuTask);
    return ctx.scene.leave();
  };
}

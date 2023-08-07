import { SCENE } from 'bot/constants/scenes.enum';
import { ISceneBehave } from '../scene.type';
import { Scenes } from 'telegraf';
import { inject, injectable } from 'inversify';
import { TYPE_TASK_CONTAINERS } from 'container/bot/task/task.type';
import { IBotContext } from 'bot/interfaces/context.interface';
import { extractMessageFromChat } from 'common/helpers/contextHelpers';
import { convertStringToDate } from 'common/utils/dateUtils';
import { backMenuTask } from 'bot/buttons/task.button';
import { SubscribeTaskService } from 'bot/services/subscriptionsTask.service';
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
      SCENE.SET_NOTIFICATION_TASK,
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

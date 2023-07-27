import { SCENE } from 'bot/constants/scenes.enum';
import { ISceneBehave } from '../scene.type';
import { Scenes } from 'telegraf';
import { ITaskService } from 'bot/services/task.service';
import { inject, injectable } from 'inversify';
import { TYPE_TASK_CONTAINERS } from 'container/bot/task/task.type';
import { IBotContext } from 'bot/context/context.interface';
import { exctractUserIdFromChat, extractMessageFromChat } from 'utils/contextHelpers';
import { ISceneDeleteTask } from './task.interface';
import { catchAsyncFunction } from 'utils/catchAsync';

@injectable()
export class DeleteTaskScene implements ISceneBehave {
  scene: Scenes.WizardScene<IBotContext>;

  taskService: ITaskService;

  constructor(
    @inject(TYPE_TASK_CONTAINERS.TaskService) taskService: ITaskService
  ) {
    this.taskService = taskService;

    this.scene = new Scenes.WizardScene<IBotContext>(
      SCENE.DELETE_TASK,
      this.askTaskID,
      this.extractTaskID
    );
  }

  getInstance() {
    return this.scene;
  }

  askTaskID(ctx: IBotContext) {
    ctx.reply('Введите номер задачи');
    ctx.scene.session.removeTask = {} as ISceneDeleteTask;
    ctx.wizard.next();
  };

  extractTaskID = (ctx: IBotContext) => {
    const taskID = extractMessageFromChat(ctx);
    ctx.scene.session.removeTask.id = Number(taskID);

    this.handle(ctx);
  };

  handle = async (ctx: IBotContext) =>
    catchAsyncFunction(ctx, async () => {
      const userID = exctractUserIdFromChat(ctx);
      await this.taskService.deleteTaskById(ctx.scene.session.removeTask, userID);
      ctx.reply('Задача была удалена из ваших дел!');
      return ctx.scene.leave();
    });
}

import { SCENE } from 'bot/constants/scenes.enum';
import { ISceneBehave } from '../scene.type';
import { Scenes } from 'telegraf';
import { ITaskService } from 'bot/services/task.service';
import { inject, injectable } from 'inversify';
import { TYPE_TASK_CONTAINERS } from 'container/bot/task/task.type';
import { IBotContext } from 'bot/context/context.interface';
import { IRemoveTask } from './task.interface';
import { extractMessageFromChat } from 'utils/extractMessage';

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
      this.exctractData
    );
  }

  getInstance() {
    return this.scene;
  }

  askTaskID(ctx: IBotContext) {
    ctx.reply('Введите номер задачи');
    ctx.scene.session.removeTask = {} as IRemoveTask;
    return ctx.wizard.next();
  }

  exctractData(ctx: IBotContext) {
    const taskID = extractMessageFromChat(ctx);
    ctx.scene.session.removeTask.id = Number(taskID);

    this.taskService.deleteTaskById(ctx.scene.session.removeTask);
    return ctx.scene.leave();
  };
}

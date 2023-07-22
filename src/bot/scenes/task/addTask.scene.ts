import { Scenes } from 'telegraf';
import { ISceneBehave } from '../scene.type';
import { SCENE } from 'bot/constants/scenes.enum';
import { ITaskService } from 'bot/services/task.service';
import { inject, injectable } from 'inversify';
import { TYPE_TASK_CONTAINERS } from 'container/task/task.type';
import { IBotContext } from 'bot/context/context.interface';
import { extractMessageFromChat } from 'utils/extractMessage';

@injectable()
export class AddTaskScene implements ISceneBehave {
  scene: Scenes.WizardScene<IBotContext>;

  taskService: ITaskService;

  constructor(
    @inject(TYPE_TASK_CONTAINERS.TaskService) taskService: ITaskService
  ) {
    this.taskService = taskService;

    this.scene = new Scenes.WizardScene<IBotContext>(
      SCENE.ADD_TASK,
      this.askTitle,
      this.askDescription,
      this.exctractData
    );
  }

  getInstance() {
    return this.scene;
  }

  askTitle = async (ctx: IBotContext) => {
    ctx.scene.session.addTask = {};
    ctx.reply('Введите заголовок задачи');
    return ctx.wizard.next();
  };

  askDescription = async (ctx: IBotContext) => {
    const title = extractMessageFromChat(ctx);
    ctx.scene.session.addTask.title = title;

    ctx.reply('Введите описание');
    return ctx.wizard.next();
  };

  exctractData = async (ctx: IBotContext) => {
    const description = extractMessageFromChat(ctx);
    ctx.scene.session.addTask.description = description;
    this.taskService.addTask(ctx.scene.session.addTask);
    return ctx.scene.leave();
  };
}

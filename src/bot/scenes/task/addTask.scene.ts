import { Scenes } from 'telegraf';
import { ISceneBehave } from '../scene.type';
import { SCENE } from 'bot/constants/scenes.enum';
import { ITaskService } from 'bot/services/task.service';
import { inject, injectable } from 'inversify';
import { TYPE_TASK_CONTAINERS } from 'container/bot/task/task.type';
import { IBotContext } from 'bot/context/context.interface';
import { exctractUserIdFromChat, extractMessageFromChat } from 'utils/contextHelpers';
import { ISceneAddTask } from './task.interface';

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
      this.askTitle, this.askDescription, this.getAnswerDescription, this.getAnswerDescription
    );
  }

  getInstance() {
    return this.scene;
  }

  askTitle = async (ctx: IBotContext) => {
    const userID = exctractUserIdFromChat(ctx);
    ctx.scene.session.addTask = {} as ISceneAddTask;
    ctx.scene.session.addTask.userID = userID;
    ctx.reply('Введите заголовок задачи');
    ctx.wizard.next();
  };

  askDescription = async (ctx: IBotContext) => {
    const title = extractMessageFromChat(ctx);
    ctx.scene.session.addTask.title = title;
    ctx.reply('Введите описание');
    ctx.wizard.next();
  };

  getAnswerDescription = async (ctx: IBotContext) => {
    const message = extractMessageFromChat(ctx);
    ctx.scene.session.addTask.description = message;
    this.handle(ctx);
  };

  handle = async (ctx: IBotContext) => {
    ctx.reply('Задача была добавлена');
    this.taskService.addTask(ctx.scene.session.addTask);
    return ctx.scene.leave();
  };
}

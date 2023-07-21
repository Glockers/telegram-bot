import { Scenes } from 'telegraf';
import { ISceneBehave } from '../scene.type';
import { SCENE } from 'bot/constants/scenes.enum';
import { ITaskService } from 'bot/services/task.service';
import { inject, injectable } from 'inversify';
import { TYPE_TASK_CONTAINERS } from 'container/task/task.type';

@injectable()
export class AddTaskScene implements ISceneBehave {
  scene: Scenes.WizardScene<any>;

  taskService: ITaskService;

  constructor(
    @inject(TYPE_TASK_CONTAINERS.TaskService) taskService: ITaskService
  ) {
    this.taskService = taskService;

    this.scene = new Scenes.WizardScene<any>(
      SCENE.ADD_TASK,
      this.askTitle,
      this.askDescription,
      this.exctractData
    );
  }

  getInstance() {
    return this.scene;
  }

  askTitle = async (ctx: any) => {
    ctx.reply('Введите город');
    ctx.wizard.state.subscribe_weather = {};
    return ctx.wizard.next();
  };

  askDescription = async (ctx: any) => {
    ctx.wizard.state.subscribe_weather.city = ctx.message.text;
    ctx.reply('Введите время');
    return ctx.wizard.next();
  };

  exctractData = async (ctx: any) => {
    ctx.wizard.state.subscribe_weather.time = ctx.message.text;
    this.taskService.addTask(ctx.wizard.state);
    return ctx.scene.leave();
  };
}

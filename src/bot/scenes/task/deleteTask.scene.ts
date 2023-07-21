import { SCENE } from 'bot/constants/scenes.enum';
import { ISceneBehave } from '../scene.type';
import { Scenes } from 'telegraf';
import { ITaskService } from 'bot/services/task.service';
import { inject, injectable } from 'inversify';
import { TYPE_TASK_CONTAINERS } from 'container/task/task.type';

@injectable()
export class DeleteTaskScene implements ISceneBehave {
  scene: Scenes.WizardScene<any>;

  taskService: ITaskService;

  constructor(
    @inject(TYPE_TASK_CONTAINERS.TaskService) taskService: ITaskService
  ) {
    this.taskService = taskService;
    this.scene = new Scenes.WizardScene<any>(
      SCENE.DELETE_TASK,
      //   this.askCity,
      //   this.askTime,
      this.exctractData
    );
  }

  getInstance() {
    return this.scene;
  }

  exctractData = async (ctx: any) => {
    ctx.wizard.state.subscribe_weather.time = ctx.message.text;
    this.taskService.deleteTaskById(ctx.wizard.state);
    return ctx.scene.leave();
  };
}

import { ISceneAddTask, ISceneDeleteTask } from 'bot/scenes/task/task.interface';
import { ISceneSubscribeWeather, ISceneUnsubscribeWeather } from 'bot/scenes/weather/weather.interface';
import { Scenes } from 'telegraf';

export interface IBotWizardSessionData extends Scenes.WizardSessionData {
  subscribeWeather: ISceneSubscribeWeather,
  unsubscribeWeather: ISceneUnsubscribeWeather,
  addTask: ISceneAddTask,
  removeTask: ISceneDeleteTask,
}

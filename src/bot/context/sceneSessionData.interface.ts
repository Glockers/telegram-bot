import { IAddTask, IRemoveTask } from 'bot/scenes/task/task.interface';
import { ISubscribeWeatherData, IUnsubscribeWeather } from 'bot/scenes/weather/weather.interface';
import { Scenes } from 'telegraf';

export interface IBotWizardSessionData extends Scenes.WizardSessionData {
  subscribeWeather: ISubscribeWeatherData,
  unsubscribeWeather: IUnsubscribeWeather,
  addTask: IAddTask,
  removeTask: IRemoveTask,
}

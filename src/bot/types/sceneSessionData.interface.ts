import { Scenes } from 'telegraf';
import { SessionAddTask, SessionTaskId, SessionSubscribeTask } from '@bot/scenes/task/task.interface';
import { SessionSubscribeWeather, SessionUnsubscribeWeather } from '@bot/scenes/weather/weather.interface';
import { SessionPlace } from '@bot/scenes/recomend/recommend.type';

export interface IBotWizardSessionData extends Scenes.WizardSessionData {
  subscribeWeather: SessionSubscribeWeather;
  unsubscribeWeather: SessionUnsubscribeWeather;
  addTask: SessionAddTask;
  sceneIdTask: SessionTaskId;
  subscribeTask: SessionSubscribeTask;
  places: SessionPlace;
}

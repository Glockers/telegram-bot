import { ISceneAddTask as SessionAddTask, ISceneIdTask as SessionTaskId, ISubscribeTaskSession as SessionSubscribeTask } from '@bot/scenes/task/task.interface';
import { ISceneSubscribeWeather as SessionSubscribeWeather, ISceneUnsubscribeWeather as SessionUnsubscribeWeather } from '@bot/scenes/weather/weather.interface';
import { Scenes } from 'telegraf';

import { SessionPlace } from '@bot/scenes/recomend/recommend.type';

export interface IBotWizardSessionData extends Scenes.WizardSessionData {
  subscribeWeather: SessionSubscribeWeather;
  unsubscribeWeather: SessionUnsubscribeWeather;
  addTask: SessionAddTask;
  sceneIdTask: SessionTaskId;
  subscribeTask: SessionSubscribeTask;
  places: SessionPlace;
}

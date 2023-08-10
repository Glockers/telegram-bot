import { Scenes } from 'telegraf';
import {
  SessionPlace, SessionSubscribeWeather,
  SessionUnsubscribeWeather, SessionAddTask,
  SessionTaskId, SessionSubscribeTask
} from '@bot/scenes';

export interface IBotWizardSessionData extends Scenes.WizardSessionData {
  subscribeWeather: SessionSubscribeWeather;
  unsubscribeWeather: SessionUnsubscribeWeather;
  addTask: SessionAddTask;
  sceneIdTask: SessionTaskId;
  subscribeTask: SessionSubscribeTask;
  places: SessionPlace;
}

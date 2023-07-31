import { AbstactAction } from 'bot/interfaces/actions.class';
import { IContainer, InversifyContainer } from 'container/inversifyContainer';
import { TYPE_ACTION_CONTAINERS } from './actions.type';
import { TaskAction } from 'bot/actions/task.action';
import { WeatherAction } from 'bot/actions/weather.action';

export class ActionContainer implements IContainer {
  initContainer() {
    InversifyContainer.bind<AbstactAction>(TYPE_ACTION_CONTAINERS.TaskAction).to(TaskAction);
    InversifyContainer.bind<AbstactAction>(TYPE_ACTION_CONTAINERS.WeatherAction).to(WeatherAction);
  }
}

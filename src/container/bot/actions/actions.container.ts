import { AbstactAction } from '@bot/interfaces';
import { IContainer, InversifyContainer } from '@container/inversifyContainer';
import { TYPE_ACTION_CONTAINERS } from './actions.type';
import {
  TaskAction, WeatherAction,
  GreetingAction, RecommendAction
} from '@bot/actions';

export class ActionContainer implements IContainer {
  initContainer(): void {
    InversifyContainer.bind<AbstactAction>(TYPE_ACTION_CONTAINERS.TaskAction).to(TaskAction);
    InversifyContainer.bind<AbstactAction>(TYPE_ACTION_CONTAINERS.WeatherAction).to(WeatherAction);
    InversifyContainer.bind<AbstactAction>(TYPE_ACTION_CONTAINERS.GreetingAction).to(GreetingAction);
    InversifyContainer.bind<AbstactAction>(TYPE_ACTION_CONTAINERS.RecommendAction).to(RecommendAction);
  }
}

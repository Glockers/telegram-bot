import { IContainer, InversifyContainer } from '@container/inversifyContainer';
import { TYPE_REPOSITORY_CONTAINERS } from './repository.type';
import {
  TaskRepository,
  TaskSubscribeRepository,
  WeatherSubscribeRepository
} from '@infra/database';

export class RepositoryContainer implements IContainer {
  initContainer(): void {
    InversifyContainer.bind<TaskRepository>(TYPE_REPOSITORY_CONTAINERS.TaskRepository).to(TaskRepository).inSingletonScope();
    InversifyContainer.bind<TaskSubscribeRepository>(TYPE_REPOSITORY_CONTAINERS.TaskSubscribeRepository).to(TaskSubscribeRepository).inSingletonScope();
    InversifyContainer.bind<WeatherSubscribeRepository>(TYPE_REPOSITORY_CONTAINERS.WeatherSubscribeRepository).to(WeatherSubscribeRepository).inSingletonScope();
  }
}

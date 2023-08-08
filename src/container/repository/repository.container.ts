import { IContainer, InversifyContainer } from '@container/inversifyContainer';
import { TYPE_REPOSITORY_CONTAINERS } from './repository.type';
import { TaskRepository } from '@infra/database/repository/task.repository';
import { TaskSubscribeRepository } from '@infra/database/repository/taskSubscribe.repository';
import { WeatherSubscribeRepository } from '@infra/database/repository/weatherSubscribe.repository';

export class RepositoryContainer implements IContainer {
  initContainer(): void {
    InversifyContainer.bind<TaskRepository>(TYPE_REPOSITORY_CONTAINERS.TaskRepository).to(TaskRepository).inSingletonScope();
    InversifyContainer.bind<TaskSubscribeRepository>(TYPE_REPOSITORY_CONTAINERS.TaskSubscribeRepository).to(TaskSubscribeRepository).inSingletonScope();
    InversifyContainer.bind<WeatherSubscribeRepository>(TYPE_REPOSITORY_CONTAINERS.WeatherSubscribeRepository).to(WeatherSubscribeRepository).inSingletonScope();
  }
}

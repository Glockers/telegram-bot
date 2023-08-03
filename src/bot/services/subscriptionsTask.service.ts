import { ISubscribeTaskSession } from 'bot/scenes/task/task.interface';
import { TYPE_REPOSITORY_CONTAINERS } from 'container/repository/repository.type';
import { ITaskSubscribeEntity } from 'infra/database/entities/taskSubscribe.entity';
import { ITaskSubscribe, TaskSubscribeRepository } from 'infra/database/repository/taskSubscribe.repository';
import { inject, injectable } from 'inversify';
import { TaskService } from './task.service';
import { TaskRepository } from 'infra/database/repository/task.repository';

export interface ISubscribeTaskService {
  getSubscriptionTaskById: (taskID: number) => Promise<ITaskSubscribeEntity | null>;
  subscribeOnTask: (data: ISubscribeTaskSession) => Promise<void>;
  unSubFromTask(subID: number): Promise<void>;
}

@injectable()
export class SubscribeTaskService extends TaskService implements ISubscribeTaskService {
  taskSubscribeRepository: TaskSubscribeRepository;

  constructor(
    @inject(TYPE_REPOSITORY_CONTAINERS.TaskSubscribeRepository) taskSubscribeRepository: TaskSubscribeRepository,
    @inject(TYPE_REPOSITORY_CONTAINERS.TaskRepository) taskRepository: TaskRepository
  ) {
    super(taskRepository);
    this.taskSubscribeRepository = taskSubscribeRepository;
  }

  async getSubscriptionTaskById(taskID: number): Promise<ITaskSubscribeEntity | null> {
    return await this.taskSubscribeRepository.findOneByTaskID(taskID);
  }

  async subscribeOnTask(data: ISubscribeTaskSession): Promise<void> {
    const sub = await this.getTaskById(data.taskID);
    const newSub: ITaskSubscribe = {
      ...data,
      taskEntity: sub
    };
    await this.taskSubscribeRepository.add(newSub);
  }

  async unSubFromTask(subID: number): Promise<void> {
    const sub = await this.getSubscriptionTaskById(subID);
    if (!sub) throw new Error('Такой подписки нет!');
    await this.taskSubscribeRepository.delete(sub);
  }
}

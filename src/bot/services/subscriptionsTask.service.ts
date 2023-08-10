import { inject, injectable } from 'inversify';
import { SessionSubscribeTask } from '@bot/scenes';
import { TYPE_REPOSITORY_CONTAINERS } from '@container/repository';
import {
  ITaskSubscribeEntity, ITaskSubscribe,
  TaskSubscribeRepository, TaskRepository
} from '@infra/database';
import { TaskService } from './task.service';
import { SUB_TASK_NOT_FOUND } from '@bot/constants';

export interface ISubscribeTaskService {
  getSubscriptionTaskById: (taskID: number) => Promise<ITaskSubscribeEntity | null>;
  subscribeOnTask: (data: SessionSubscribeTask) => Promise<void>;
  unSubFromTask(subID: number): Promise<void>;
}

@injectable()
export class SubscribeTaskService extends TaskService implements ISubscribeTaskService {
  private readonly taskSubscribeRepository: TaskSubscribeRepository;

  constructor(
    @inject(TYPE_REPOSITORY_CONTAINERS.TaskSubscribeRepository) taskSubscribeRepository: TaskSubscribeRepository,
    @inject(TYPE_REPOSITORY_CONTAINERS.TaskRepository) taskRepository: TaskRepository
  ) {
    super(taskRepository);
    this.taskSubscribeRepository = taskSubscribeRepository;
  }

  async getSubs(): Promise<ITaskSubscribeEntity[]> {
    return await this.taskSubscribeRepository.getAll();
  }

  async getSubscriptionTaskById(taskID: number): Promise<ITaskSubscribeEntity | null> {
    return await this.taskSubscribeRepository.findOneByTaskID(taskID);
  }

  async subscribeOnTask(data: SessionSubscribeTask): Promise<void> {
    const sub = await this.getTaskById(data.taskID);
    const newSub: ITaskSubscribe = {
      ...data,
      taskEntity: sub
    };
    await this.taskSubscribeRepository.add(newSub);
  }

  async unSubFromTask(subID: number): Promise<void> {
    const sub = await this.getSubscriptionTaskById(subID);
    if (!sub) throw new Error(SUB_TASK_NOT_FOUND);
    await this.taskSubscribeRepository.delete(sub);
  }
}

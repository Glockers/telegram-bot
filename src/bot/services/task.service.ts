import { inject, injectable } from 'inversify';
import { SessionAddTask, SessionTaskId } from '@bot/scenes';
import { UserError } from '@common/exceptions';
import { TYPE_REPOSITORY_CONTAINERS } from '@container/repository';
import { ITaskEntity, TaskRepository } from '@infra/database';

export interface ITaskService {
  getTasks: (userID: number) => Promise<ITaskEntity[]>;
  deleteTaskById: (data: SessionTaskId, userID: number) => Promise<boolean>;
  addTask: (data: SessionAddTask) => Promise<void>;
  getTaskById: (taskID: number) => Promise<ITaskEntity>;

}

@injectable()
export class TaskService implements ITaskService {
  private readonly taskRepository: TaskRepository;

  constructor(
    @inject(TYPE_REPOSITORY_CONTAINERS.TaskRepository) taskRepository: TaskRepository
  ) {
    this.taskRepository = taskRepository;
  }

  getTasks(userID: number): Promise<ITaskEntity[]> {
    return this.taskRepository.getAll(userID);
  }

  async deleteTaskById(data: SessionTaskId, userID: number): Promise<boolean> {
    const selectedTask = await this.getTaskById(data.id);
    if (selectedTask?.userID !== userID) throw UserError.sendMessage('Задача с таким ID не найдена');
    this.taskRepository.delete(selectedTask);
    return true;
  }

  async getTaskById(idTask: number): Promise<ITaskEntity> {
    const result = await this.taskRepository.findOneById(idTask);
    if (!result) throw UserError.sendMessage('Задача с таким ID не найдена');
    return result;
  }

  // TODO ANY
  async addTask(data: any): Promise<void> {
    await this.taskRepository.add(data);
  }
}

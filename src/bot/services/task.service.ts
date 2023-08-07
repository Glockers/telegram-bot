import { ISceneAddTask, ISceneIdTask } from 'bot/scenes/task/task.interface';
import { UserError } from 'common/exceptions/userError';
import { TYPE_REPOSITORY_CONTAINERS } from 'container/repository/repository.type';
import { ITaskEntity } from 'infra/database/entities/task.entity';
import { TaskRepository } from 'infra/database/repository/task.repository';
import { inject, injectable } from 'inversify';

export interface ITaskService {
  getTasks: (userID: number) => Promise<ITaskEntity[]>;
  deleteTaskById: (data: ISceneIdTask, userID: number) => Promise<boolean>;
  addTask: (data: ISceneAddTask) => Promise<void>;
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

  async deleteTaskById(data: ISceneIdTask, userID: number): Promise<boolean> {
    const selectedTask = await this.getTaskById(data.id);
    if (selectedTask?.userID !== userID) throw UserError.sendMessage('Задача с таким ID не найдена');
    this.taskRepository.delete(selectedTask);
    return true;
  }

  async getTaskById(idTask: number): Promise<ITaskEntity> {
    const result = await this.taskRepository.findOneById(idTask);
    console.log('test:', result);
    if (!result) throw UserError.sendMessage('Задача с таким ID не найдена');
    return result;
  }

  async addTask(data: ISceneAddTask): Promise<void> {
    await this.taskRepository.add(data);
  }
}

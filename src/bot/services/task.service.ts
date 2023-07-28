import { ISceneAddTask, ISceneIdTask } from 'bot/scenes/task/task.interface';
import { TYPE_REPOSITORY_CONTAINERS } from 'container/repository/repository.type';
import { ITaskEntity } from 'infra/database/entities/task.entity';
import { TAddTask, TaskRepository } from 'infra/database/repository/task.repository';
import { inject, injectable } from 'inversify';

export interface ITaskService {
  getTasks: (userID: number) => Promise<ITaskEntity[]>;
  deleteTaskById: (data: ISceneIdTask, userID: number) => Promise<boolean>;
  addTask: (data: ISceneAddTask, userID: number) => void;
}

@injectable()
export class TaskService implements ITaskService {
  taskRepository: TaskRepository;

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
    if (selectedTask?.userID !== userID) throw new Error('Задача с таким ID не найдена');
    this.taskRepository.delete(selectedTask);
    return true;
  }

  async getTaskById(idTask: number): Promise<ITaskEntity> {
    const result = await this.taskRepository.findOneById(idTask);
    if (!result) throw new Error('Задача с таким ID не найдена');
    return result;
  }

  addTask(data: ISceneAddTask, userID: number): void {
    const newTask: TAddTask = {
      ...data,
      userID
    };
    this.taskRepository.add(newTask);
  }
}

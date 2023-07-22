import { IAddTask, IRemoveTask } from 'bot/scenes/task/task.interface';
import { injectable } from 'inversify';

export interface ITaskService {
  getTasks: () => void;
  deleteTaskById: (data: IRemoveTask) => void;
  addTask: (data: IAddTask) => void;
}

@injectable()
export class TaskService implements ITaskService {
  getTasks() { }

  deleteTaskById(data: IRemoveTask) {
    console.log('deleteTaskById');
  }

  addTask(data: IAddTask) {
    console.log('addTask: ', data);
  }
}

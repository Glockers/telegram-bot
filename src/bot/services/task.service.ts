import { injectable } from 'inversify';

export interface ITaskService {
  getTasks: () => void;
  deleteTaskById: (id: number) => void;
  addTask: (data: any) => void;
}

@injectable()
export class TaskService implements ITaskService {
  getTasks() {}

  deleteTaskById(id: number) {
    console.log('deleteTaskById');
  }

  addTask(data: any) {
    console.log('addTask: ', data);
  }
}

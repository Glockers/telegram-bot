export interface ITaskService {
  getTasks: () => void,
  deleteTaskById: () => void
  addTask: () => void
}

export class TaskService implements ITaskService {
  getTasks() {

  };

  deleteTaskById() {
    console.log('deleteTaskById');
  };

  addTask() {
  }
}

import { AddTaskScene } from 'bot/scenes/task/addTask.scene';
import { DeleteTaskScene } from 'bot/scenes/task/deleteTask.scene';
import { ITaskService, TaskService } from 'bot/services/task.service';
import { IContainer, InversifyContainer } from 'container/inversifyContainer';
import { TYPE_SCENES_CONTAINERS } from 'container/bot/scenes/scenes.type';
import { TYPE_TASK_CONTAINERS } from 'container/bot/task/task.type';
import { ITaskController, TaskController } from 'bot/controllers/task.controller';

export class TaskContainer implements IContainer {
  initContainer() {
    InversifyContainer.bind<ITaskService>(TYPE_TASK_CONTAINERS.TaskService).to(TaskService);
    InversifyContainer.bind<ITaskController>(TYPE_TASK_CONTAINERS.TaskController).to(TaskController);

    InversifyContainer.bind<AddTaskScene>(TYPE_SCENES_CONTAINERS.AddTaskScene).to(AddTaskScene);
    InversifyContainer.bind<DeleteTaskScene>(TYPE_SCENES_CONTAINERS.DeleteTaskScene).to(DeleteTaskScene);
  }
}
import { AddTaskScene } from "bot/scenes/task/addTask.scene";
import { DeleteTaskScene } from "bot/scenes/task/deleteTask.scene";
import { ITaskService, TaskService } from "bot/services/task.service";
import { IContainer, InversifyContainer } from "container/inversifyContainer";
import { TYPE_SCENES_CONTAINERS } from "container/scenes/scenes.type";
import { TYPE_TASK_CONTAINERS } from "container/task/task.type";

export class TaskContainer implements IContainer {
    initContainer() {
      InversifyContainer.bind<ITaskService>(TYPE_TASK_CONTAINERS.TaskService).to(TaskService);
      InversifyContainer.bind<AddTaskScene>(TYPE_SCENES_CONTAINERS.AddTaskScene).to(AddTaskScene);
      InversifyContainer.bind<DeleteTaskScene>(TYPE_SCENES_CONTAINERS.DeleteTaskScene).to(DeleteTaskScene);
    }
  }
  